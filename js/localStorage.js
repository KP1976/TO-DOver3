const LocalStorage = (_=>{
  // Zapisywanie zadania w LocalStorage
  function saveTaskInLocalStorage(task) {
    // let id, taskName, date; 
    let tasks;

    if(localStorage.getItem('tasks') !== null) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
      tasks = [];
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 

    return tasks[tasks.length - 1].id;
  }

  // Czyszczenie LocalStorage
  function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

  // Usuwanie zadania z LocalStorage
  function removeTaskFromLocalStorage(item) {
    let tasks;

    if(localStorage.getItem('tasks') !== null) {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
    } else {
      tasks = [];
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
    if(localStorage.getItem('tasks') !== null) {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
    } else {
      tasks = [];
    }

    tasks.forEach((task) => {
      Main.makeTasksList(task);
    });

    if(tasks.length > 0) {
      return tasks[tasks.length - 1].id;
    }
  }

  return {
    saveTaskInLocalStorage,
    clearTasksFromLocalStorage,
    removeTaskFromLocalStorage,
    showTasksFromLocalSotrage,
  };
})();
