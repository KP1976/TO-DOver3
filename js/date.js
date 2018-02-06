const _Date = (_=> {
  // Funkcja pobiera aktualną datę i zamienia ją na polską notację
  function executeDate() {
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

    return {
      year,
      month,
      dayNumber,
      dayName,
      hour,
      minutes,
      seconds
    };
  }
  
  return executeDate;

})();