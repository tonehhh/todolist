const inputText = document.querySelector('#text');
const addButton = document.querySelector('.add-button');
const list = document.querySelector('.container ul');

// Render existing tasks from localStorage
window.addEventListener('load', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const myLi = document.createElement('li');
    myLi.className = "task";
    myLi.innerHTML = task.text;
    list.appendChild(myLi);

    const myInput = document.createElement('input');
    myInput.type = "checkbox";
    myInput.className = "completed";
    myInput.checked = task.completed;
    myLi.appendChild(myInput);

    const mySpan = document.createElement('span');
    mySpan.innerHTML = 'X';
    myLi.appendChild(mySpan);
  });
});

// Add new task to localStorage
addButton.addEventListener('click', (e)=>{
  if(inputText.value != ""){
    e.preventDefault();

    const myLi = document.createElement('li');
    myLi.className = "task";
    myLi.innerHTML = inputText.value;
    list.appendChild(myLi);

    const myInput = document.createElement('input');
    myInput.type = "checkbox";
    myInput.className = "completed";
    myLi.appendChild(myInput);

    const mySpan = document.createElement('span');
    mySpan.innerHTML = 'X';
    myLi.appendChild(mySpan);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: inputText.value, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  inputText.value = "";
});

// Update completion status in localStorage
list.addEventListener('change', (e) => {
  if (e.target.classList.contains('completed')) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = [...list.children].indexOf(e.target.parentElement);
    tasks[index].completed = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

// Remove task from localStorage
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = [...list.children].indexOf(e.target.parentElement);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    e.target.parentElement.style.opacity = 0;
    setTimeout(() =>{
      e.target.parentElement.style.display = "none";
      e.target.parentElement.remove();
    },500);
  }
});
