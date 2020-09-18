$(document).ready(function(){
var startYear = 2018;
var startMonth = 0;
var date = "2018-01-01";

var momentDate = moment(date);

var source = $("#day-template").html();
var template = Handlebars.compile(source);


$.ajax(
  {
    "url" : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    "data" : {
      "year": 2018,
      "month": 0
    },
    "method": "GET",
    "success": function(data, status) {
      printHolidays(data);
    },
    "error" : function(franco) {
      alert("Errore");
    }
  }
);



function printHolidays(data) {
  var daysInMonth = momentDate.daysInMonth();
  for (var i = 0; i <= daysInMonth; i++) {
    var context =  {
      "day": i,
      "month": momentDate.format("MMMMM")
    };
  };
  var html = $(template(context));

  var currentMomentDate = moment(context.day + context.month + startYear);
  var currentMomentDateFormat = currentMomentDate.format("YYYY-MM-DD");

  if (data.response.lenght > 0) {
    for (var j = 0; j < data.response.lenght; j++) {
      if (data.response[j].date == currentMomentDateFormat) {
        $(html).addClasse("holiday");

        var holidayName = data.response[j].name;
      $(html).append(" &mdash; <span>" + holidayName + "</span>");
      }
    }
  }

  $("#days")
}




});
