const STATUS_TYPES = {
    PENDING:'Pending',
    COMPLETE:'Complete'
};

var store = {
    activeFilter: null,
    categories:[

    ],
    todo: [
    ]
}


const PENDING_ICON = `
<svg id="pending-icon" onclick="toggleItem(event)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" class="bi bi-check-circle status-icon" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg>
`;

const COMPLETE_ICON = `
<svg  onclick="toggleItem(event)" id="complete-icon" xmlns="http://www.w3.org/2000/svg"  width="24" height="24"   fill="green" class="bi bi-check-circle-fill status-icon" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>

`;


function getFilteredItems(){
    if(store.activeFilter == null)
        return store.todo;
    return store.todo.filter(function (element) {
        return element.status === store.activeFilter
    })
}

function getTodoItem(itemId){
    return store.todo.filter(function(element){
        return element.id === parseInt(itemId);
    })[0];
}

function generateTodoId(){
    if(store.todo.length === 0)
        return 1;
    let ids = store.todo.map(function(element){
        return element.id
    });
    let max = Math.max(...ids)

    return max+1;
}

function getRandomColor(){
    let colors = [
        '#32a852',
        '#5280ff',
        '#be51fc',
        '#ffab4a',
        'rgb(250, 216, 21)',
        '#000',
        '#fff',
    ];
    return colors[Math.floor(Math.random() * (colors.length-1))]
}


function getParentNodeWithClass(childNode, parentNodeClass){
    let parentNode = childNode.parentElement;
    while(!parentNode.classList.contains(parentNodeClass)){
        parentNode = parentNode.parentElement;
    }
    return parentNode;
}


function createTodoNode({id,title,status, color}){
    return `
        <div todo-id="${id}" class="list-item" style="border-left-color: ${color}">
                <div class="item-content">
                    <span class="item-title">${title}</span>
                    <div class="item-info">
                        Status: 
                        <span id="item-status" class="${status == STATUS_TYPES.PENDING? 'pending' : 'complete'}">${status}</span>
                    </div>
                </div>
                <div class="item-action-container">
                    <div class="item-action">
                        ${status === STATUS_TYPES.PENDING? PENDING_ICON : COMPLETE_ICON}
                    </div>
                    <div class="item-action delete">
                        <svg id='delete-icon' xmlns="http://www.w3.org/2000/svg" onclick="deleteItem(event)" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </div>
                </div>
            </div>
    `;
}

function AddClassToNodes(elementsClass, classToAdd){
    let nodes = document.getElementsByClassName(elementsClass);
    for(let node of nodes){
        node.classList.add(classToAdd);
    }
}

function removeClassFromNodes(elementsClass, classToRemove){
    let nodes = document.getElementsByClassName(elementsClass);
    for(let node of nodes){
        node.classList.remove(classToRemove);
    }
}

function setUpFilterEvents(){
    let nodes = document.getElementsByClassName('filter');
    for(let node of nodes){
        node.addEventListener('click', function(){
            removeClassFromNodes('filter', 'active');
            node.classList.add('active');
        })
        node.classList.remove('active');
    }
    switch(store.activeFilter){
        case null:{
            let filterElement = document.getElementById('filter-all');
            filterElement.classList.add('active');
            return;
        }
        case STATUS_TYPES.PENDING:{
            let filterElement = document.getElementById('filter-pending');
            filterElement.classList.add('active');
            return;
        }
        case STATUS_TYPES.COMPLETE:{
            let filterElement = document.getElementById('filter-complete');
            filterElement.classList.add('active');
            return;
        }
    }
}

function toggleItem(event){
    let target = event.target;
    if(target !== null){
        while(!target.classList.contains('status-icon')){
            target = target.parentElement
        }    
        let parentNode = getParentNodeWithClass(target,'list-item');
        let todoId = parentNode.getAttribute('todo-id');
        let status = parentNode.querySelectorAll('.item-content')[0]
                        .querySelectorAll('.item-info')[0]
                        .querySelectorAll('#item-status')[0];
        let actionContainer =  parentNode.querySelectorAll('.item-action-container')[0]
                            .querySelectorAll('.item-action')[0];
        let todoItem = getTodoItem(todoId);
        if(todoItem.status == STATUS_TYPES.PENDING){
            status.classList.remove('pending');
            status.classList.add('complete');
            status.innerHTML = 'Complete';
            
            todoItem.status = STATUS_TYPES.COMPLETE;
            actionContainer.innerHTML = COMPLETE_ICON;
        }
        else{
            status.classList.remove('complete');
            status.classList.add('pending');
            status.innerHTML = 'pending';
            let todoItem = getTodoItem(todoId);
            todoItem.status = STATUS_TYPES.PENDING;
            actionContainer.innerHTML = PENDING_ICON;
        }      
        populateList();
    } 
}


function populateList(){
    const todoList = document.getElementById('list');
    const deleteContainer = document.getElementById('delete-container');
    todoList.innerHTML = '';
    let items = getFilteredItems()
    if(items.length > 0){
        deleteContainer.style.display = 'flex';
    }
    else {
        deleteContainer.style.display = 'none';
    }
    for(let item of items){
        let childNode = document.createElement('div');
        childNode.innerHTML = createTodoNode(item);
        todoList.appendChild(childNode);
    }
    setUpFilterEvents();

}

function deleteItem(event){
    let target = event.target;
    while(!target.classList.contains('delete')){
        target = target.parentElement;
    }
    let parentNode = getParentNodeWithClass(event.target,'list-item')
    let id = parseInt(parentNode.getAttribute('todo-id'));
    store.todo = store.todo.filter((element)=>{
        return element.id !== id;
    })
    populateList();
}

function addTodo(event){
    let button = document.getElementById('submitBtn') 
    let input = document.getElementById('title-input')
    if(input.value.length === 0){
        return;
    }
    let todo = {
        id:generateTodoId(),
        title: input.value,
        status: STATUS_TYPES.PENDING,
        color: getRandomColor()
    }
    store.todo.push(todo);
    input.value = '';
    button.setAttribute('disabled','');
    button.classList.add('disabled');
    populateList();

}


function onTextChange(event){
    let target = event.target;
    const button = document.getElementById('submitBtn')
    if(target.value.length >= 4){
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    }
    else {
        button.setAttribute('disabled','');
        button.classList.add('disabled');
    }
}
function onFilterClick(filter){
    store.activeFilter = filter;
    populateList();
}

function deleteAllItems(){
    store.todo = [];
    populateList();
}
function captureKeyPress(event){
    if(event.keyCode == 13){
        let input = event.target;
        let value = input.value;
        if(value!== null && value!== '' && value.length > 4){
            addTodo()
        }
    }
    else if(event.keyCode == 27 ){
        clearInput()
    }
}

function clearInput(){
    let button = document.getElementById('submitBtn');
    let input = document.getElementById('title-input');
    input.value = '';
    button.setAttribute('disabled','');
    button.classList.add('disabled');
}

function switchFilterOnKeypress(event){
    let key = event.key;
        if(key == 'ArrowLeft' || key == 'ArrowRight'){
            if(key == 'ArrowLeft'){
                switch(store.activeFilter){
                    case null:{
                        return;
                    }
                    case STATUS_TYPES.PENDING:{
                        onFilterClick(null);
                        return;
                    }
                    case STATUS_TYPES.COMPLETE:{
                        onFilterClick(STATUS_TYPES.PENDING);
                        return;
                    }
                }
            }
            else if(key == 'ArrowRight'){
                switch(store.activeFilter){
                    case null:{
                        onFilterClick(STATUS_TYPES.PENDING);
                        return;
                    }
                    case STATUS_TYPES.PENDING:{
                        onFilterClick(STATUS_TYPES.COMPLETE);
                        return;
                    }
                    case STATUS_TYPES.COMPLETE:{
                        return;
                    }
                }
            }
        } 
}


document.addEventListener('DOMContentLoaded', function(){
    populateList();

    document.addEventListener('keydown',switchFilterOnKeypress);
    
})
