const Vars = (_=> {
  const chacheVars = {
    tasksBox: document.querySelector('.tasks-box'),
    taskInput: document.querySelector('.task-input'),
    addtask: document.querySelector('.add-task'),
    tasksList: document.querySelector('.tasks-list'),
    delAllTasks: document.querySelector('.delete-all-tasks')
  };

  return {
    getVars: _=> {
      return chacheVars;
    }
  };
})();