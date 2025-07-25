import { Task } from "./components/task";
import { TaskList } from "./components/taskList";
//import { renderTask, clearTasks } from "./components/UI";

const taskList = new TaskList();
const form = document.getElementById('task-form');
//const calendarContainer = document.getElementById('Calendar');
//const monthYearHeading = document.getElementById('month-year');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = form.elements['title'].value;
    const date = form.elements['date'].value;
    const category = form.elements['category'].value;
    const priority = form.elements['priority'].value;

    const task = new Task(Date.now(), title, date, category, priority);
    taskList.addTask(task);
 
    form.reset();
    renderCalendar(taskList);
});

let currentDate = new Date();
currentDate.setDate(1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"  
  ];

 function renderCalendar(tasklist, date = currentDate) {
  const calendarContainer = document.getElementById("calendar");
  const monthYearHeading = document.getElementById("month-year");
  
  if(!calendarContainer || !monthYearHeading) return;

  calendarContainer.innerHTML = ''; // Clear previous tasks

  while(calendarContainer.children.length>7) {
  calendarContainer.removeChild(calendarContainer.lastChild);
 }
  //const today = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYearHeading.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year,month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 (sun) to 6 (sat)

//calendarContainer.appendChild(cell);


const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
for(let day of days){
  const header = document.createElement('div');
  header.classList.add('day-header');
  header.textContent = day;
  calendarContainer.appendChild(header);
 
}
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

    const isToday = datestr === new Date().toISOString().split('T')[0];
      if(isToday) {
        cell.classList.add('today');
  }

    const dateHeader = document.createElement('h4');
    dateHeader.textContent = day;
    cell.appendChild(dateHeader);

    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    cell.addEventListener('dragleave', () => {
      cell.style.backgroundColor = '';
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      cell.style.backgroundColor = '';
      const taskId = e.dataTransfer.getData('text/plain');
      taskList.updateTaskDate(taskId, datestr);
      renderCalendar(taskList,currentDate); // re-render to show updated tasks
    });


    //show tasks under this date
    const tasks = taskList.getTasksByDate(datestr);
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task', task.priority, task.category);
      if(task.completed) {
        taskItem.classList.add('completed');
      }

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.toggleCompleted();
        renderCalendar(taskList, currentDate); // re-render to show updated tasks
      });

      const lable = document.createElement('span');
      lable.textContent = task.title;
      lable.style.marginLeft = '5px';
      taskItem.appendChild(checkbox);
      taskItem.appendChild(lable);


      //taskItem.textContent = task.title;
      taskItem.setAttribute('draggable', 'true');
      taskItem.dataset.taskId = task.id;

      taskItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
      });
      cell.appendChild(taskItem);
    });
    calendarContainer.appendChild(cell);
  }

  const totalCells = startDay + totalDays;
  const remaining = 7 - (totalCells % 7);
  if(remaining < 7) {
    for(let i=0; i<remaining; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('calendar-cell');
      calendarContainer.appendChild(emptyCell);
  }
}
 }

 document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth()-1);
  renderCalendar(taskList, currentDate);
 });

 document.getElementById("next-month").addEventListener("click",() => {
  currentDate.setMonth(currentDate.getMonth()+1);
  renderCalendar(taskList, currentDate);
 });

 // render omce on page load
 renderCalendar(taskList);
 