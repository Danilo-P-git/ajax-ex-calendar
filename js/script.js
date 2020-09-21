$(document).ready(function(){

var date = "2018-01-01";
var momentDate = moment(date);
// var test = momentDate.subtract(1, 'month');
// console.log(test);
// console.log(momentDate);
printCalendar(momentDate)

$.ajax(
  {
    "url" : "https://flynn.boolean.careers/exercises/api/holidays",
    "data" : {
      "year": 2018,
      "month": 0
    },
    "method": "GET",
    "success": function(data) {
      printHolidays(data.response);
    },
    "error" : function(franco) {
      alert("Errore");
    }
  }
);
});

function printCalendar(data) {

  $("#data-odierna").text(data);
  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= data.daysInMonth(); i++) {
    var day = addZero(i);
    var dateComplete = data.format("YYYY") + "-" + data.format("MM") + "-" + day;
    var context = {
      "day": i,
      "month": data.format("MMMM"),
      "dateComplete": dateComplete
    };

    var html = template(context);
    $("#days").append(html);
  }
}

function printHolidays(holidays) {
  if (holidays.length > 0) {
    for (var i = 0; i < holidays.length; i++) {
      var holidayDate = holidays[i].date;
      var holidayName = holidays[i].name;

      $(".day[data-date='"+holidayDate+"']").addClass("holiday");

      $(".day[data-date='"+holidayDate+"'] .holidayType").text("- " +holidayName);
    }
  }
}


function addZero(day) {
  if (day < 10) {
    return "0" + day
  }
  return day;
}
