import React, { useContext, useState } from "react";
import Button from "./Button";
import { ThemeContext } from "../store/TodoItemsProvider";
import { todoItemClientModel } from "../utils/ModelUtil";

const TodoItem = ({ id, toDoText, toDoDate , completed}) => {
  const { deleteTodoItem } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState(completed);
  console.log(isChecked);

  const formattedDate = new Date(toDoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });

  const ToggleComplete = () => {
    fetch(`http://localhost:5000/todos/:${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !isChecked }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        const clientUpdatedItem = todoItemClientModel(updatedItem);
        setIsChecked(clientUpdatedItem.completed);
      });
    console.log("trying to deleted item with id :", id);
  };

  const deleteHandler = () => {
    fetch(`http://localhost:5000/todos/:${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => {
        const clientDeletedItem = todoItemClientModel(deletedItem);
        deleteTodoItem(clientDeletedItem.id);
      });
    console.log("trying to deleted item with id :", id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={ToggleComplete}
          className="h-5 w-5"
        />

        <div
          className={`flex-1 ${isChecked ? " underline text-gray-500" : ""}`}
        >
          <p className="text-gray-800 font-medium ">{toDoText}</p>

          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>

        <div>
          <Button btnType="danger" btnText="Delete" handler={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
