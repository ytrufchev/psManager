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
getAdvertisers();
function getAdvertisers(){
var page = Number(localStorage.getItem("page"));
          var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://profitshare.bg/mobile/getcatalog-advertisers/",
  "method": "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
  },
  "data": 'type=Android&order=1&page='+page+'&token='+localStorage.getItem("token")
}
$.ajax(settings).done(function (response1) {
  document.getElementById("advertisersList").innerHTML = "";
  document.getElementById("advertisersList").scrollTop;
  for(i in response1.advertisers){
    document.getElementById("advertisersList").innerHTML += "<div class='individualAdvertiser' style='line-height: 10vh; height: 10vh;'><img src='http://profitshare.bg/"+response1.advertisers[i].logo+"' style='max-width: 10v; width:20vw; max-height: 8vh; left: 2vw; position: relative; vertical-align: middle;'><div style='position: relative; height: 9vh; width:55vw; top: -9.5vh; left: 23vw; display:grid; grid-template-columns: repeat(3, 2fr); text-align: center; font-size: 1.5vh; line-height:2vh;'><div>Категория</div><div>Комисионна</div><div>Период</div><div>"+response1.advertisers[i].category+"</div><div>"+response1.advertisers[i].orders+"</div><div>"+response1.advertisers[i].period+" дни</div></div></div>";
  }
  if(response1.has_next_page === true){
    localStorage.setItem("page", (Number(localStorage.getItem("page"))+1));
    document.getElementById("advertisersList").innerHTML += "<br><text style='position: relative; left: 25vw; top: -5vh; color: blue;' onclick='getAdvertisers();'>Следваща страница</text>";
  }
});
}