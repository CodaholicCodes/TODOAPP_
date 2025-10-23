export const TodoItemsReducer=(currentItems,action)=>{
switch(action.type){
    case 'ADD_ITEM':
        const {id,todoText,todoDate} =action.payload;
    return [...currentItems,{id,todoText,todoDate}] ;   
    
        case 'DELETE_ITEM':
        const {todoId} =action.payload;
    return currentItems.filter(item=>item.id!==todoId
    ) ;
    
        case 'LOAD_ALL':
        const {allItems} =action.payload;
    return allItems ;
    default : 
    return currentItems; 
}
}