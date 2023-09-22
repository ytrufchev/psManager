    logIn();
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
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval0='+localStorage.getItem("Period")+'&token='+localStorage.getItem("token")
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
  "url": "https://profitshare.bg/reports/dashboard/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
document.getElementById("result").innerHTML = response;
var vals = document.getElementById("chart_graph_clicks").innerHTML;
document.getElementById("result").innerHTML = "";
var matchData = /(?<=)[0-9](.*)([0-9])/gmi;
var data = vals.match(matchData);
var data1 = data[2];
var array = data1.split("],[")
});
function genLink(){
  if (localStorage.getItem("times") === null) {
  localStorage.setItem("times", 0);
}
var myUser= "_554907f055e66";
var myKey = "cf6abec7232a6ca8986ecf5742a570f0bc0ad10a";
  var apiKey = localStorage.getItem("apikey");
  var apiUser = localStorage.getItem("apiuser");
  var url1 = document.getElementById("link").value;
  var time = localStorage.getItem("times");
  if (time < 25 ){
	apiKey = localStorage.getItem("apikey").toString();
  apiUser = localStorage.getItem("apiuser").toString();
  localStorage.setItem("times", parseInt(time)+1);
}
else if(time == 25){
	apiKey = window.myKey;
  apiUser = window.myUser;
  localStorage.setItem("times", 0);
}
              var settings = {
  async: false,
  crossDomain: true,
  url: "http://psmanager.atwebpages.com/", 
  method: "POST",
  data: {api_user: apiUser, api_key: apiKey, query: url1}
}
    $.ajax(settings).done(function (response) {
var result = JSON.parse(response);
var ps_link = result.result[0].ps_url;
document.getElementById("link").value = ps_link;
});
}
