// Get token from username and password then store it in localstorage for login
function getToken(){
  var email = document.getElementById('username').value.toLowerCase();
  localStorage.setItem("mail", email);
  var password = document.getElementById('pass').value;
  localStorage.setItem("pass", password);
  logIn();
  location.href="index.html";
}
function logIn(){
  var mail = localStorage.getItem("mail");
  var pass = localStorage.getItem("pass");
      var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&device=Galaxy+S4&email='+mail+'&token=02:00:00:00:00:00&password='+pass
}

$.ajax(settings).done(function (response) {
  localStorage.setItem("token", response.token)
});
}
  function getEarnings(){
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
  console.log(response1.win);
});
}
  function getConversions(){
    logIn();
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/get-user-conversions/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&page=1&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
 for(i in response.commissions){
   var com = response.commissions[i];
   console.log("Рекламодател: "+com.adv+" \nкомисионна: "+com.com+" \nдата: "+com.date);
 }
});
}
function getStatsToday(){
    logIn();
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval0=1&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
   console.log("Днес \nКликове: "+response.nrClicks+" \nКомисионни: "+response.commissions+" \nКонверсии: "+response.conversion_sum);
});
}
function getStatsYesterday(){
    logIn();
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval1=1&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
   console.log("Вчера \nКликове: "+response.nrClicks+" \nКомисионни: "+response.commissions+" \nКонверсии: "+response.conversion_sum);
});
}
function getStats7Days(){
    logIn();
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval2=1&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
   console.log("7 дни \nКликове: "+response.nrClicks+" \nКомисионни: "+response.commissions+" \nКонверсии: "+response.conversion_sum);
});
}
  function getStats30Days(){
    logIn();
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getUserStats/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&interval3=1&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response) {
   console.log("30 дни \nКликове: "+response.nrClicks+" \nКомисионни: "+response.commissions+" \nКонверсии: "+response.conversion_sum);
});
}
function logOut(){
  localStorage.removeItem("mail");
  localStorage.removeItem("pass");
  localStorage.removeItem("token");
  location.href="index.html";
}
