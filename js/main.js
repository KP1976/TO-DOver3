// Funkcja główna programu
const Main = (Vars => {
  const allVars = Vars.getVars(); // selektory pobrane z pliku vars.js
  let index = 1;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let dayNumber = date.getDate();
  let dayName = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  switch(dayName) {
    case 0: 
      dayName = 'Niedziela';
      break;
    case 1: 
      dayName = 'Poniedziałek';
      break;
    case 2:
      dayName = 'Wtorek';
      break; 
    case 3:
      dayName = 'Środa';
      break; 
    case 4:
      dayName = 'Czwartek';
      break; 
    case 5:
      dayName = 'Piątek';
      break; 
    case 6:
      dayName = 'Sobota';
      break; 
  }

  switch(month) {
    case 0: 
      month = 'stycznia';
      break;
    case 1: 
      month = 'lutego';
      break;
    case 2: 
      month = 'marca';
      break;
    case 3: 
      month = 'kwietnia';
      break;
    case 4: 
      month = 'maja';
      break;
    case 5: 
      month = 'czerwca';
      break;
    case 6: 
      month = 'lipca';
      break;
    case 7: 
      month = 'sierpnia';
      break;
    case 8: 
      month = 'września';
      break;
    case 9: 
      month = 'października';
      break;
    case 10: 
      month = 'listopada';
      break;
    case 11: 
      month = 'grudnia';
      break;
  }

  // Funkcja tworzy listę zadań z inkrementowanym indeksem, edycją zadania, kasowaniem zadania i datą     powstania zadania
  function makeTasksList() {
    const inputValue = allVars.taskInput.value;
    const li = document.createElement('li');

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
      <span class="task-date">${dayName} ${dayNumber} ${month} ${year} r. godz. ${hour}:${minutes}:${seconds}</span>
    `;

    allVars.tasksList.insertAdjacentElement('beforeend', li);
    allVars.taskInput.value = '';
    index++;
  }

   
  function clearAll() {
    while(allVars.tasksList.firstChild) {
      allVars.tasksList.removeChild(allVars.tasksList.firstChild);
    }
  }

  function executeEventListeners() {
    allVars.addtask.addEventListener('click', makeTasksList);
    allVars.delAllTasks.addEventListener('click', clearAll);
  }

  function displayAlert() {
    const div = document.createElement('div');

    div.className = 'alert';
    div.textContent = 'Nie można dodać pustego zadania!';
    allVars.tasksBox.insertAdjacentElement('afterbegin', div);

    setTimeout(_=> div.remove(), 2500); // Ostrzeżenie znika po dwóch sekundach
  }

  return {
    init: _=> {
      executeEventListeners();
    }
  };
})(Vars);

// Execute program
document.addEventListener('DOMContentLoaded', _=> {
  Main.init();
});