    logIn();
    var clicks = [];
    var clickDataLabels = [];
    var clickDataPoints = [];
    var commissions = [];
    var commissionDataLabels = [];
    var commissionDataPoints = [];
    var conversions = [];
    var conversionDataLabels = [];
    var conversionDataPoints = [];
    var valConv;
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserEarnings/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response1) {
  document.getElementById("total-earnings-amount").innerHTML = "<text>"+response1.win+"</text>";
});
var period = localStorage.getItem('Period');
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval=0&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
  if(response.commissions > 0){
  document.getElementById("total-earnings-today").innerHTML="<text>+ "+response.commissions+" лв. днес</text>";
  }
  else{
    document.getElementById("total-earnings-today").innerHTML="<text style='color:white;'>"+response.commissions+" лв. днес</text>";
  }
});
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval=2&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) { 
  document.getElementById("clickCount").innerHTML = "<text>"+response.nrClicks+"</text>";
  document.getElementById("commissionAmount").innerHTML = "<text>"+response.conversion_sum+"</text>";
  document.getElementById("conversionAmount").innerHTML = "<text>"+response.commissions+"</text>";
});
//make clicks chart
var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/reports/ajax-load?",
  "method": "GET",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=clicks&period=last_week&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
  var data = JSON.parse(response);
  var t = data.aaData;
  var clearContent = /(?=)\d(.*)(?=)\d/gmi;

  for(i in t){
    clicks.push(t[i][4].match(clearContent));
  }
    var utc = new Date();
  var days = utc.getDate();
  var dateDay = days - 7;
  var dateDay1 = days - dateDay;
  for(i=0; i<7; i++){
    clickDataLabels[i] = "";
    clickDataPoints[i] = 0;
  }
  
  for(i in clicks){
    var str = clicks[i].toString();
  var res = str.substring(0, 2);
  var timePatt = /\d\d:\d\d/gmi;
  var time = str.match(timePatt);
  clickDataPoints[(parseInt(res) - parseInt(dateDay))] = (clickDataPoints[(parseInt(res) - parseInt(dateDay))] + 1);
  }
});
var chart    = document.getElementById('clicksChart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(20, 89, 227, 0.5)');
gradient.addColorStop(0.5, 'rgba(20, 89, 227, 0.25)');
gradient.addColorStop(1, 'rgba(20, 89, 227, 0)');


var data  = {
    labels: clickDataLabels,
    display: false,
    datasets: [{
            backgroundColor: gradient,
            borderWidth: 1,
            borderColor: '#1459e3',
            data: clickDataPoints,
            pointRadius: 0
    }]
};


var options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        easing: 'easeInOutQuad',
        duration: 520
    },
    legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 6,
                }
            }
        },
    scales: {
        xAxes: [{
            display: false,
            gridLines: {
                color: 'rgba(200, 200, 200, 0.05)',
            }
        }],
        yAxes: [{
            display: false,
            gridLines: {
                color: 'rgba(200, 200, 200, 0.08)',
            }
        }]
    },
    elements: {
        line: {
            tension: 0.4
        }
    },
    legend: {
        display: false
    },
    tooltips: {
        titleFontFamily: 'Open Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
    }
};


var chartInstance = new Chart(chart, {
    type: 'line',
    data: data,
        options: options
});
//make commissions chart
var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/reports/dashboard/show_title/0/show_period/0/show_options_button/0/show_group_options/0/graph_size/770/show_row_numbers/0/show_pager/0",
  "method": "GET",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'period=last_week'
}
$.ajax(settings).done(function (response) {
document.getElementById("result1").innerHTML = response;
var vals = document.getElementById("chart_graph_commision").innerHTML;
window.valConv = document.getElementById("chart_graph_conversion").innerHTML;
document.getElementById("result1").innerHTML = "";
var testMatch = /\s+/gmi;
var testvals = vals.replace(testMatch, "");
var arrayPatt = /\[(.*)\];/gmi;
var array = testvals.match(arrayPatt);
var clearMatch = /(?<=data:)(.*?]])/gmi;
var clearedArray = array.toString().match(clearMatch);
var clearedArray1 = JSON.parse(clearedArray);
for(i in clearedArray1){
  commissions.push(clearedArray1[i]);
}
for(i=0; i<7; i++){
commissionDataLabels.push("");
commissionDataPoints.push(0);
}
    var utc = new Date();
  var days = utc.getDate();
  var earlyDate = days - 7;
for(i in commissions){
  var timestamp = commissions[i][0];
  var amount = commissions[i][1];
  var date = new Date(timestamp);
  var day = date.getDate();
  commissionDataPoints[parseInt(day)-parseInt(earlyDate)] = (commissionDataPoints[parseInt(day)-parseInt(earlyDate)] + amount);
  console.log(commissionDataPoints);
}
});
var chart    = document.getElementById('commissionsChart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(19, 207, 37, 0.5)');
gradient.addColorStop(0.5, 'rgba(19, 207, 37, 0.25)');
gradient.addColorStop(1, 'rgba(19, 207, 37, 0)');


var data  = {
    labels: commissionDataLabels,
    display: false,
    datasets: [{
            backgroundColor: gradient,
            borderWidth: 1,
            borderColor: '#13cf25',
            data: commissionDataPoints,
            pointRadius: 0
    }]
};


var options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        easing: 'easeInOutQuad',
        duration: 520
    },
    legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 6,
                }
            }
        },
    scales: {
        xAxes: [{
            display: false,
            gridLines: {
                color: 'rgba(200, 200, 200, 0.05)',
            }
        }],
        yAxes: [{
            display: false,
            gridLines: {
                color: 'rgba(200, 200, 200, 0.08)',
            }
        }]
    },
    elements: {
        line: {
            tension: 0.4
        }
    },
    legend: {
        display: false
    },
    tooltips: {
        titleFontFamily: 'Open Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
    }
};


var chartInstance = new Chart(chart, {
    type: 'line',
    data: data,
        options: options
});
//make conversions chart
var vals = window.valConv;
var testMatch = /\s+/gmi;
var testvals = vals.replace(testMatch, "");
var arrayPatt = /\[(.*)\];/gmi;
var array = testvals.match(arrayPatt);
var clearMatch = /(?<=data:)(.*?]])/gmi;
var clearedArray = array.toString().match(clearMatch);
var clearedArray1 = JSON.parse(clearedArray);
for(i in clearedArray1){
  conversions.push(clearedArray1[i]);
}
for(i=0; i<7; i++){
conversionDataLabels.push("");
conversionDataPoints.push(0);
}
    var utc = new Date();
  var days = utc.getDate();
  var earlyDate = days - 7;
for(i in conversions){
  var timestamp = conversions[i][0];
  var amount = conversions[i][1];
  var date = new Date(timestamp);
  var day = date.getDate();
  conversionDataPoints[parseInt(day)-earlyDate] = (conversionDataPoints[parseInt(day)-earlyDate] + amount);
}
var chart    = document.getElementById('conversionsChart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(222, 212, 16, 0.5)');
gradient.addColorStop(0.5, 'rgba(222, 212, 16, 0.25)');
gradient.addColorStop(1, 'rgba(222, 212, 16, 0)');


var data  = {
    labels: conversionDataLabels,
    display: false,
    datasets: [{
            backgroundColor: gradient,
            borderWidth: 1,
            borderColor: '#ded410',
            data: conversionDataPoints,
            pointRadius: 0
    }]
};


var options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        easing: 'easeInOutQuad',
        duration: 520
    },
    legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 6,
                }
            }
        },
    scales: {
        xAxes: [{
            display: false,
            gridLines: {
                color: 'rgba(200, 200, 200, 0.05)',
            }
        }],
        yAxes: [{
            display: false,
            gridLines: {
                color: 'rgba(200, 200, 200, 0.08)',
            }
        }]
    },
    elements: {
        line: {
            tension: 0.4
        }
    },
    legend: {
        display: false
    },
    tooltips: {
        titleFontFamily: 'Open Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
    }
};


var chartInstance = new Chart(chart, {
    type: 'line',
    data: data,
        options: options
});