// Funkcja główna programu
const Main = (_=> {
  const allVars = Vars.getVars(); // selektory pobrane z pliku vars.js

  // Funkcja tworzy listę zadań z inkrementowanym indeksem, edycją zadania, kasowaniem zadania i datą powstania zadania
  function makeTasksList(task) {
    const li = document.createElement('li');

    li.className = 'task-wrapper';
    li.innerHTML = `
      <div class="task">
        <span class="task-id">${task.id}</span>
        <span class="task-text">${task.taskName}</span>
        <button class="task-edit"><i class="fas fa-cog"></i></button>
        <button class="task-delete"><i class="fas fa-times"></i></button>
      </div>
      <span class="task-date">${task.date.dayName} ${task.date.dayNumber} ${task.date.month} ${task.date.year} r. godz. ${task.date.hour}:${task.date.minutes}:${task.date.seconds}</span>
    `;

    allVars.tasksList.insertAdjacentElement('beforeend', li);
  }

  // Funkcja dodaje zadanie
  function addTask() {
    if(allVars.taskInput.value === '') {
      displayAlert();
      return;
    }
    
    if(index === undefined) {
      index = 1;
    } else {
      index++;
    }
    
    let taskObj = {
      id: index,
      taskName: allVars.taskInput.value,
      date: {
        year: getTime().year,
        month: getTime().month,
        dayNumber: getTime().dayNumber,
        dayName: getTime().dayName,
        hour: getTime().hour,
        minutes: getTime().minutes,
        seconds: getTime().seconds
      }
    };
    
    
    makeTasksList(taskObj);

    LocalStorage.saveTaskInLocalStorage(taskObj);

    allVars.taskInput.value = '';
  }

  function getTime() {
    let dateVars = _Date.executeDate();

    if(dateVars.minutes >= 0 && dateVars.minutes < 10)
      dateVars.minutes = '0' + dateVars.minutes;

    if(dateVars.seconds >= 0 && dateVars.seconds < 10)
      dateVars.seconds = '0' + dateVars.seconds;

    return dateVars;
  }
  
  // Funkcja edytuje zadanie
  function editTask(e) {
    if(e.target.classList.contains('task-edit')) {
      const btn = document.createElement('button');
      let task = e.target.previousElementSibling;

      btn.className = 'update-task';
      btn.textContent = 'aktualizuj zadanie';

      allVars.addtask.replaceWith(btn);
      
      allVars.taskInput.value = task.textContent;

      document.querySelector('.update-task').addEventListener('click', e => {
        const inputValue = allVars.taskInput.value;
        let dateVars = getTime();

        if(inputValue === '') {
          displayAlert();
          return;
        } else {
          task.textContent = inputValue;
          allVars.taskInput.value = '';

          task.parentNode.nextElementSibling.textContent = `${dateVars.dayName} ${dateVars.dayNumber} ${dateVars.month} ${dateVars.year} r. godz. ${dateVars.hour}:${dateVars.minutes}:${dateVars.seconds}`;

          e.target.replaceWith(allVars.addtask);
          console.log(JSON.parse(localStorage.getItem('tasks')));
          console.log(task.previousElementSibling.textContent); 

          // id tego zadania, które edytuje (String zamieniony na number (int))
          let idEdit = parseInt(task.previousElementSibling.textContent); 

          let tasks = JSON.parse(localStorage.getItem('tasks'));
          
          tasks.forEach(id => {
            if(id.id === idEdit) {
              id.taskName = inputValue;
              localStorage.setItem('tasks', JSON.stringify(tasks));
            }
          });
        }
      });
    }
  }

  // Funkcja kasuje pojedyncze zadanie
  function deleteTask(e) {
    if(e.target.classList.contains('task-delete')) {
      createConfirmDeleteAlert();

      const yes = document.querySelector('.yes');    
      const no = document.querySelector('.no');  

      yes.addEventListener('click', _=> {
        yes.parentNode.remove();
        e.target.parentNode.parentNode.remove();
        allVars.tasksBox.style.opacity = '1';
        LocalStorage.removeTaskFromLocalStorage(e.target.parentNode.parentNode);
      });

      no.addEventListener('click', _=> {
        no.parentNode.remove();
        allVars.tasksBox.style.opacity = '1';
      });
    } 
  }

  function createConfirmDeleteAlert() {
    const div = document.createElement('div');

    div.className = 'confirm-delete';

    div.innerHTML = `
      <h3>Jesteś pewny?</h3>
      <button class="confirm-btn yes">Tak</button>
      <button class="confirm-btn no">Nie</button>
    `;

    allVars.tasksBox.insertAdjacentElement('beforebegin', div);
    allVars.tasksBox.style.opacity = '0.3';
  }

  // Filtrowanie zadań
  function filterTasks(e) {
    const text = e.target.value.toLowerCase(); // zamiana na mełe litery
    const tasksArray = document.querySelectorAll('.task-wrapper');

    tasksArray.forEach(task => {
      const item = task.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.textContent;

      if(item.toLowerCase().indexOf(text) !== -1) {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
  }

  // Funckja czyści wszystkie zadania
  function clearAll() {
    createConfirmDeleteAlert();

    const yes = document.querySelector('.yes');    
    const no = document.querySelector('.no');  

    yes.addEventListener('click', _=> {
      yes.parentNode.remove();

      while(allVars.tasksList.firstChild) {
        allVars.tasksList.removeChild(allVars.tasksList.firstChild);
      }

      LocalStorage.clearTasksFromLocalStorage(); // Czyszczenie LocalStorage
      
      allVars.tasksBox.style.opacity = '1';
    });

    no.addEventListener('click', _=> {
      no.parentNode.remove();
      allVars.tasksBox.style.opacity = '1';
    });

    index = 0;
  }

  function animCogStart(e) {
    if(e.target.classList.contains('task-edit')) {
      e.target.firstChild.classList.toggle('fa-spin');
    }
  }

  function animCogStop(e) {
    if(e.target.classList.contains('task-edit')) {
      e.target.firstChild.classList.toggle('fa-spin');
    }
  }

  // Funkcja odpala wszystkie zdarzenia
  function executeEventListeners() {
    allVars.addtask.addEventListener('click', addTask);
    allVars.tasksList.addEventListener('click', editTask);
    allVars.tasksList.addEventListener('click', deleteTask);
    allVars.tasksList.addEventListener('mouseover', animCogStart);
    allVars.tasksList.addEventListener('mouseout', animCogStop);
    allVars.filter.addEventListener('keyup', filterTasks);
    allVars.delAllTasks.addEventListener('click', clearAll);
  }

  // Funkcja wyświetla komunikat o błędzie, jeśli chcemy dodać puste zadanie
  function displayAlert() {
    const div = document.createElement('div');

    div.className = 'alert';
    div.textContent = 'Nie można dodać pustego zadania!';
    allVars.horizontalLIne[0].insertAdjacentElement('beforebegin', div);

    setTimeout(_=> div.remove(), 2500); // Ostrzeżenie znika po dwóch sekundach
  }

  return {
    makeTasksList,
    init: _=> {
      index = LocalStorage.showTasksFromLocalSotrage();
      executeEventListeners();
    }
  };
})();

// Execute program
document.addEventListener('DOMContentLoaded', _=> Main.init());