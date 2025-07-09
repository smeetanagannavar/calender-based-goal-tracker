import { Task } from "./components/task";
import { TaskList } from "./components/taskList";
//import { renderTask, clearTasks } from "./components/UI";

const taskList = new TaskList();
const form = document.getElementById('task-form');
const calendarContainer = document.getElementById('Calendar');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = form.elements['title'].value;
    const date = form.elements['date'].value;
    const category = form.elements['category'].value;
    const priority = form.elements['priority'].value;

    const task = new Task(Date.now(), title, date, category);
    taskList.addTask(task);
 
    form.reset();
    renderCalendar(taskList);
});


 function renderCalendar() {
  calendarContainer.innerHTML = ''; // Clear previous tasks

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();


  const firstDay = new Date(year,month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 (sun) to 6 (sat)

  // fill initial empty cells (if month doesn't start on Sunday)
  for(let i=0; i<startDay; i++){
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-cell');
    calendarContainer.appendChild(emptyCell);
  }

  //fill the actual days
  for(let day = 1; day <= totalDays; day++) {
    const datestr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');

    const dateHeader = document.createElement('h4');
    dateHeader.textContent = day;
    cell.appendChild(dateHeader);

    //show tasks under this date
    const tasks = taskList.getTasksByDate(datestr);
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task', task.category);
      taskItem.textContent = task.title;
      cell.appendChild(taskItem);
    });

    calendarContainer.appendChild(cell);
  }
 }

 // render omce on page load
 renderCalendar();
 