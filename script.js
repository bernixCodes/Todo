const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)

function addTodo(event){
   event.preventDefault();

   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');

   const todoItem = document.createElement('li');
   todoItem.innerText = todoInput.value;
   todoItem.classList.add('todo-item');
   todoDiv.appendChild(todoItem);
   saveLocalTodos(todoInput.value)



   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<span class="material-icons-sharp"> done </span>'
   completedButton.classList.add('completed-btn');
   todoDiv.appendChild(completedButton);

   const deleteButton = document.createElement('button');
   deleteButton.innerHTML = '<span class="material-icons-sharp"> delete </span>'
   deleteButton.classList.add('delete-btn');
   todoDiv.appendChild(deleteButton);

   todoList.appendChild(todoDiv)

   todoInput.value = '';

}

function deleteOrCheck(e){
   const item = e.target;

   //Delete  Todo
   if(item.classList[0] === "delete-btn"){
      const deleteTodo = item.parentElement;
      deleteTodo.classList.add('fall');
      removeLocalStorageTodo(deleteTodo)
      deleteTodo.addEventListener('transitionend', ()=> deleteTodo.remove())
   }

   //Check Mark
   if(item.classList[0] === "completed-btn"){
      const checkTodo = item.parentElement;
     checkTodo.classList.toggle('line-through')
   }
}


function filterTodo(e){

   const todos = todoList.children;

   for(let i =0; i < todos.length; i++){
     
          switch (e.target.value) {
         case "all":
            todos[i].style.display = 'flex'
            break;
      
         case "completed": 
           if(todos[i].classList.contains('line-through')){
            todos[i].style.display = 'flex';
           }else{
            todos[i].style.display = 'none';
           }
           break;
         
         case 'uncompleted':
            if(todos[i].classList.contains('line-through')){
               todos[i].style.display = 'none';
              }else{
               todos[i].style.display = 'flex';
              }
              break;
      }
   }
}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
   todos = []
  }
  else{
   todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
   let todos;
   if(localStorage.getItem('todos') === null){
    todos = []
   }
   else{
    todos = JSON.parse(localStorage.getItem('todos'))
   }
 
   todos.forEach(todo =>{
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      const todoItem = document.createElement('li');
      todoItem.innerText = todo;
      todoItem.classList.add('todo-item');
      todoDiv.appendChild(todoItem);


      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<span class="material-icons-sharp"> done </span>'
      completedButton.classList.add('completed-btn');
      todoDiv.appendChild(completedButton);

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<span class="material-icons-sharp"> delete </span>'
      deleteButton.classList.add('delete-btn');
      todoDiv.appendChild(deleteButton);

      todoList.appendChild(todoDiv)
   })
 }

 function removeLocalStorageTodo(todo){
   let todos;
   if(localStorage.getItem('todos') === null){
    todos = []
   }
   else{
    todos = JSON.parse(localStorage.getItem('todos'))
   }

   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex),1)
  localStorage.setItem('todos', JSON.stringify(todos))

 }

