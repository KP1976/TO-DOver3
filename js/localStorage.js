const LocalStorage = (_=>{
  // Zapisywanie zadania w LocalStorage
  function saveTaskInLocalStorage(task) {
    let tasks, id;

    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    if(localStorage.getItem('id') === null) {
      id = 1;
    } else {
      id = JSON.parse(localStorage.getItem('id'));
    }
    
    id++;
    localStorage.setItem('id', JSON.stringify(id)); 
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }

  // Czyszczenie LocalStorage
  function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

  // Usuwanie zadania z LocalStorage
  function removeTaskFromLocalStorage(item) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    
    tasks.forEach((task, index) => {
      if(item.firstElementChild.firstElementChild.nextElementSibling.textContent === task.taskName) {
        tasks.splice(index, 1);  // od którego indexu w tablicy kasować i ile elementów
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function showTasksFromLocalSotrage() {
    let tasks;
    let id;

    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    if(localStorage.getItem('id') === null) {
      id = 1;
    } else {
      id = JSON.parse(localStorage.getItem('id'));
      localStorage.setItem('id', JSON.stringify(id)); 
    }

    tasks.forEach(task => {
      Main.makeTasksList(task);
    });

    return id;
  }

  return {
    saveTaskInLocalStorage,
    clearTasksFromLocalStorage,
    removeTaskFromLocalStorage,
    showTasksFromLocalSotrage,
  };
})();
