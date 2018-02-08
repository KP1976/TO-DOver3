const Storage = (_=>{
  // Zapisywanie zadania w LocalStorage
  function saveTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

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
      if(item.firstElementChild.firstElementChild.nextElementSibling.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  return {
    saveTaskInLocalStorage,
    clearTasksFromLocalStorage,
    removeTaskFromLocalStorage
  };
})();
