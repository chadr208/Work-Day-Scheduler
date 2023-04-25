
$(document).ready(function () {
  //Dependencies
  var dateEl = $('#currentDay');
  var timeBlockEl = $('.time-block');
  var buttonEl = $('.btn');

  //Data
  var currentDate = dayjs();
  var dateFormatted = currentDate.format('dddd, MMMM D');
  formatDate();
  var currentHour = currentDate.hour();
  

  //functions
  function formatDate(){
    if(currentDate.date() === 1){
      dateFormatted += 'st';
    }
    else if(currentDate.date() === 2){
      dateFormatted += 'nd';
    }
    else if(currentDate.date() === 3){
      dateFormatted += 'rd';
    }
    else{
      dateFormatted += 'th';
    }
  }
  //Apply color to the background according to time in hours. 
  function applyColorStyle(){
    timeBlockEl.each(function () {
      
      var blockHour = this.getAttribute('id');
      blockHour = blockHour.substring(5);
      blockHour = parseInt(blockHour);

      if(currentHour > blockHour){
        this.setAttribute('class', 'row time-block past');
      } 
      else if(currentHour === blockHour){
        this.setAttribute('class', 'row time-block present');
      }
      else{
        this.setAttribute('class', 'row time-block future');
      }

     
      $(this).contents('.description').val(localStorage.getItem($(this).attr('id')));


    });
  }

  function saveButtonListener(event){
      event.preventDefault();
      var textArea = $(event.currentTarget).parent().contents('.description').val();
      var parentId = $(event.currentTarget).parent().attr('id');


    localStorage.setItem(parentId, textArea);
  }


  //UI
  dateEl.text(dateFormatted);
  //user can see a specific color scheme on the scheduler based on the current time 
  applyColorStyle();
//  Click to save
  buttonEl.on('click', saveButtonListener);

});
