const Vars = (_=> {
  const chacheVars = {
    container: document.querySelector('.container'),
    tasksBox: document.querySelector('.tasks-box'),
    taskInput: document.querySelector('.task-input'),
    addtask: document.querySelector('.add-task'),
    tasksList: document.querySelector('.tasks-list'),
    delAllTasks: document.querySelector('.delete-all-tasks'),
    horizontalLIne: document.querySelectorAll('.h-line')
  };

  return {
    getVars: _=> {
      return chacheVars;
    }
  };
})();