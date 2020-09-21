$(document).ready(function(){

var date = "2018-01-01";
var momentDate = moment(date);

printCalendar(momentDate);

printHolidays(momentDate);

$(".next a").click(function() {
  if (momentDate.format("MM") == 12) {
      alert("Errore problema di connessione");
    } else {
      var newDate = momentDate.add(1, "M");
      clear()
      printCalendar(newDate);
      printHolidays(newDate)
    }
});
$(".prev a").click(function() {
  if (momentDate.format("MM") == 1) {
      alert("Errore problema di connessione");
    } else {
      var newDate = momentDate.subtract(1, "M");
      clear()
      printCalendar(newDate);
      printHolidays(newDate)
    }
})















});




function clear() {
$("#days li").remove();
}

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

function printHolidays(date) {
  var momentDateMonth = date.format("MM");

  $.ajax(
    {
      "url": "https://flynn.boolean.careers/exercises/api/holidays",
      "data": {
        "year" : 2018,
        "month" : momentDateMonth - 1
      },
      "method" : "GET",
      "success": function(data){
        //console.log(data.response);
        var risultato = data.response;
        if (risultato.length > 0) {
          for (var i = 0; i < risultato.length; i++) {
            var holidayDate = risultato[i].date;
            var holidayName = risultato[i].name;

            var selettoreAttr = $(".day[data-date='" + holidayDate + "']");
            selettoreAttr.children(".holidayType").addClass("holiday")
            selettoreAttr.children(".holidayType").text(holidayName);

          }
        }

      },
      "error" : function(error){
        alert("Errore!");
      }
    }
  );
};

function addZero(day) {
  if (day < 10) {
    return "0" + day
  }
  return day;
}
