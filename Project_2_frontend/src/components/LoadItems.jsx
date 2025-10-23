import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../store/TodoItemsProvider';
import { todoItemClientModel } from './../utils/ModelUtil';

const LoadItems = () => {
  const { currentItems, addAllTodoItem } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then(items => {
        console.log('Server Items : ',items);
        const newitems = items.map(todoItemClientModel);
        addAllTodoItem(newitems);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {!isLoading && currentItems.length === 0 && (
        <p className="text-center text-gray-500 italic">Enjoy your day</p>
      )}
    </div>
  );
};

export default LoadItems;
