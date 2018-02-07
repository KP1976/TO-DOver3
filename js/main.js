// Funkcja główna programu
const Main = (_=> {
  const allVars = Vars.getVars(); // selektory pobrane z pliku vars.js
  let index = 1;
 
  // Funkcja tworzy listę zadań z inkrementowanym indeksem, edycją zadania, kasowaniem zadania i datą     powstania zadania
  function makeTasksList() {
    const inputValue = allVars.taskInput.value;
    const li = document.createElement('li');
    let dateVars = getTime();

    if(inputValue === '') {
      displayAlert();
      return;
    }

    li.className = 'task-wrapper';
  
    li.innerHTML = `
      <div class="task">
        <span class="task-id">${index}</span>
        <span class="task-text">${inputValue}</span>
        <button class="task-edit"><i class="fas fa-cog"></i></button>
        <button class="task-delete"><i class="fas fa-times"></i></button>
      </div>
      <span class="task-date">${dateVars.dayName} ${dateVars.dayNumber} ${dateVars.month} ${dateVars.year} r. godz. ${dateVars.hour}:${dateVars.minutes}:${dateVars.seconds}</span>
    `;

    allVars.tasksList.insertAdjacentElement('beforeend', li);
    allVars.taskInput.value = '';
    index++;
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
        const taskDate = document.querySelector('.task-date');
        let dateVars = getTime();

        if(inputValue === '') {
          displayAlert();
          return;
        } else {
          task.textContent = inputValue;
          allVars.taskInput.value = '';

          taskDate.textContent = `${dateVars.dayName} ${dateVars.dayNumber} ${dateVars.month} ${dateVars.year} r. godz. ${dateVars.hour}:${dateVars.minutes}:${dateVars.seconds}`;

          e.target.replaceWith(allVars.addtask);
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
      
      allVars.tasksBox.style.opacity = '1';
    });

    no.addEventListener('click', _=> {
      no.parentNode.remove();
      allVars.tasksBox.style.opacity = '1';
    });

    index = 1;
  }

  // Funkcja odpala wszystkie zdarzenia
  function executeEventListeners() {
    allVars.addtask.addEventListener('click', makeTasksList);
    allVars.tasksList.addEventListener('click', editTask);
    allVars.tasksList.addEventListener('click', deleteTask);
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
    init: _=> executeEventListeners()
  };
})();

// Execute program
document.addEventListener('DOMContentLoaded', _=> Main.init());