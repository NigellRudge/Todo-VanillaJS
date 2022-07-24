const STATUS_TYPES = {
    PENDING:'Pending',
    COMPLETE:'Complete'
};

let store = {
    categories:[

    ],
    todo: [
        
    ]
}

function generateTodoId(){
    let max = Math.max(...store.todo.map(function(element){
        return element.id
    }),1)
    return max + 1;
}

function getRandomColor(){
    let colors = [
        '#32a852',
        '#5280ff',
        '#be51fc',
        '#ffab4a',
        'rgb(250, 216, 21)'
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
                        <span id="item-status" class="pending">${status}</span>
                    </div>
                </div>
                <div class="item-action-container">
                    <div class="item-action">
                        <svg id="pending-icon" onclick="completeItem(event)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" class="bi bi-check-circle show" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        <svg  onclick="setItemToPending(event)" id="complete-icon" xmlns="http://www.w3.org/2000/svg"  width="24" height="24"   fill="green" class="bi bi-check-circle-fill hidden" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </div>
                    <div class="item-action delete">
                        <svg xmlns="http://www.w3.org/2000/svg" onclick="deleteItem(event)" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
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
    }
}

function completeItem(event){
    let target = event.target;
    let parentNode = getParentNodeWithClass(target,'list-item');
    let status = parentNode.querySelectorAll('.item-content')[0]
                    .querySelectorAll('.item-info')[0]
                    .querySelectorAll('#item-status')[0]
    let completeIcon =  parentNode.querySelectorAll('.item-action-container')[0]
                        .querySelectorAll('.item-action')[0]
                        .querySelectorAll('#complete-icon')[0]
    status.classList.remove('pending');
    status.classList.add('complete');
    status.innerHTML = 'Complete';
    target.classList.add('hidden');
    target.classList.remove('show');
    completeIcon.classList.add('show');
    completeIcon.classList.remove('hidden')
}

function setItemToPending(event){
    let target = event.target;
    let parentNode = getParentNodeWithClass(target,'list-item');
    let status = parentNode.querySelectorAll('.item-content')[0]
                    .querySelectorAll('.item-info')[0]
                    .querySelectorAll('#item-status')[0]
    let pendingIcon =  parentNode.querySelectorAll('.item-action-container')[0]
                        .querySelectorAll('.item-action')[0]
                        .querySelectorAll('#pending-icon')[0]
    status.classList.remove('complete');
    status.classList.add('pending');
    status.innerHTML = 'pending';
    target.classList.add('hidden');
    target.classList.remove('show');
    pendingIcon.classList.add('show');
    pendingIcon.classList.remove('hidden');
}


function populateList(event){
    const todoList = document.getElementById('list');
    todoList.innerHTML = '';
    for(let item of store.todo){
        let childNode = document.createElement('div');
        childNode.innerHTML = createTodoNode(item);
        todoList.appendChild(childNode);
    }
}

function deleteItem(event){
    let temp = store.todo;
    let parentNode = getParentNodeWithClass(event.target,'list-item')
    let id = parseInt(parentNode.getAttribute('todo-id'));
    store.todo = temp.filter((element)=>{
        return element.id !== id;
    })
    populateList();
}

function addTodo(event){
    let button = event.target.classList.contains('button-text')? event.target.parentElement: event.target;    
    let input = document.getElementById('title-input')
    if(input.value.length == 0){
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
    if(target.value.length > 4){
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    }
    else {
        button.setAttribute('disabled','');
        button.classList.add('disabled');
    }
}

document.addEventListener('DOMContentLoaded', function(event){
    setUpFilterEvents();

    setTimeout(()=>{
        let item = document.getElementById('loading-container');
        item.style.display = 'none';
        populateList();
    },1000)
    
})