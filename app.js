const form = document.querySelector("#task-form");
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListners();

function loadEventListners(){
  form.addEventListener('submit',addTask);
  tasklist.addEventListener('click',removeTask);
  clearbtn.addEventListener('click',clearTasks);
  filter.addEventListener('keyup',filterTask);
  //Dom load event
  document.addEventListener('DOMContentLoaded',getTasks);
}

function addTask(e){
  if(taskInput.value === ''){
    alert('add a task');
  }
  //create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML =`<i class="fa fa-remove"></i>`;
  li.appendChild(link);
  tasklist.appendChild(li);
  //store in local storage
  storeTaskinLocalStorage(taskInput.value);
  //console.log(li);
  e.preventDefault();
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure?')){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    
    //console.log(e.target);
    
  }
}

function clearTasks(){
  //tasklist.innerHTML = '';
  while(tasklist.firstChild){
    tasklist.removeChild(tasklist.firstChild);
  }
  clearTasksFromLocalStorage();
} 

function filterTask(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(
    function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
    
        task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });

}

function storeTaskinLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks =[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks =[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML =`<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    tasklist.appendChild(li);
  })
}

function removeTaskFromLocalStorage(taskItem){
  console.log(taskItem.textContent);
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks =[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index ,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasksFromLocalStorage(){
  //localStorage.removeItem('tasks');
  localStorage.clear();
}