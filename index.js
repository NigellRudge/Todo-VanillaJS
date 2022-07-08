const itemTemplate = (item)=>{
    let node = document.createElement('div');
    node.innerHTML =  `
    <div class="todo-item">
        <span class="todo-text">
            ${item.title}
        </span>
        <div class="todo-action-container">
            <button class="todo-action complete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
            </button>
            <button class="todo-action remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
            </button>
        </div>
    </div>  
    `
    return node;
}
let store = [
    {id:1,title:'call mom',complete:false},
    {id:2,title:'call Dad',complete:false},
    {id:3,title:'call Tom',complete:false},
]

const TodoItem = function({id, title, complete=false}){

}



function addToStore(todoItem){
    
}

function removeFromStore(itemId){

}

function completeItem(itemId){

}

function onAddClick($event){
   
}

function addItemToList(item){

}
function getElementById(id){
    return document.getElementById(id)
}

function populateList(){
    let list = getElementById('todoList');
    clearList();
    list.remove
    for(let item of store){
        console.log(item);
        let todo = itemTemplate(item);
        list.appendChild(todo);
    }
}

function clearList(){
    let list = getElementById('todoList');
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}



document.addEventListener('DOMContentLoaded',function(event){
    populateList()
})

class Item  extends HTMLElement{
    
}