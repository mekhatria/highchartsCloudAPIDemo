function showStatus(result, label) {
  $(label).text("Status: " + result);
};

document.addEventListener('DOMContentLoaded', function() {

  //Read data from DB to the myServer
  $("#readDataFromDB").click(function() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/readDataFromDB",

      dataType: 'json',
      contentType: 'application/json',
      success: function(res) {
        //Show status
        console.log(res);
        showStatus(res.status, '#readDataFromDBLabel');
      },
      error: function() {
        //Show status
        console.log(res);
        showStatus(res.status, '#readDataFromDBLabel');
      }
    });

  });


  //Create chart 
  $("#sendToHCCloud").click(function() {

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/sendToHCCloud",

      dataType: 'json',
      contentType: 'application/json',
      success: function(res) {
        //Show status
        console.log(res);
        showStatus(res.status, '#sendToHCCloudLabel');
      },
      error: function() {
        //Show status
        console.log(res);
        showStatus(res.status, '#sendToHCCloudLabel');
      }
    });

  });

  //Dublicate chart
  $("#dublicateChart").click(function() {

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/dublicateChart",

      dataType: 'json',
      contentType: 'application/json',
      success: function(res) {
        //Show status
        console.log(res);
        showStatus(res.status, '#dublicateChartLabel');
      },
      error: function() {
        //Show status
        console.log(res);
        showStatus(res.status, '#dublicateChartLabel');
      }
    });

  });

  //Delete the chart
  $("#deleteChart").click(function() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/deleteChart",

      dataType: 'json',
      contentType: 'application/json',
      success: function(res) {
        //Show status
        console.log(res);
        showStatus(res.status, '#deleteChartLabel');
      },
      error: function() {
        //Show status
        console.log(res);
        showStatus(res.status, '#deleteChartLabel');
      }
    });

  });

}, false);
