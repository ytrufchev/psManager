    logIn();
    var apiUser = localStorage.getItem("apiuser");
    var apiKey = localStorage.getItem("apikey");
    document.getElementById("apiUser").value = apiUser;
    document.getElementById("apiKey").value = apiKey;
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
function saveAPI(){
  var apiUser = document.getElementById("apiUser").value;
  var apiKey = document.getElementById("apiKey").value;
  localStorage.setItem("apikey", apiKey);
  localStorage.setItem("apiuser", apiUser);
  location.href="main.html";
}