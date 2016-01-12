var tlLoading, tlDisplay;
var username = "Cel51"
var wLocation = ["784302","784201","783382"];
var heightFirst = 200;

$(document).ready(function (){
  init();
  setTimeout(function() {
    sizeUpdate();
  },2500)
});

$(window).resize(function (){
  sizeUpdate();
  resizeBg();
})

function sizeUpdate() {
  $("#terminal-board").css({height: $("#main-board").height()-2})
  $("#terminal").css({height: $("#main-board").height()-20})
}

function init() {
    initGreetings();
    initWeather();
    initTimeLines();

    initTerminal();

    tlLoading.play();
    setTimeout(function() {
      tlLoading.pause();
      tlDisplay.play();
    },1390);
}
function initTerminal() {
  $('#terminal').terminal({
    "!g": function(arg1) {
        $.getJSON('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q='+arg1+'&rsz=large&callback=?', function(data) {
          console.log(data);
        });
    },
    "!d": function(arg1) {
        $.getJSON('http://api.duckduckgo.com/?q='+arg1+'&format=json&pretty=1&callback=?', function(data) {
          console.log(data);
        });
    },
  },
    {
        greetings: 'Hello ' + username,
        name: 'shell',
        height: 0,
        prompt: username+'@homepage:~$ '
    }
  );
}
function initGreetings() {
  $(".greetings-helloworld .greetings-name").html(username);

  initClock();
}
function initWeather() {
  wLocation.forEach(function(i, e){
      $.simpleWeather({
        zipcode: '',
        woeid: wLocation[e],
        location: '',
        unit: 'c',
        success: function(weather) {
          var weatherObj = '<p class="weather" id="'+wLocation[e]+'">'+
  					'<span class="weather-location"></span><br>'+
  					'<span class="weather-icon"></span>'+
  					'<span class="weather-temperature"></span> <br>'+
  					'<span class="weather-description"></span>'+
  				'</p>';

          $("#weather-board").append(weatherObj);
          $("#"+wLocation[e]+" .weather-location").html(weather.city+", "+weather.region);
          $("#"+wLocation[e]+" .weather-icon").html('<i class="icon-'+weather.code+'"></i>');
          $("#"+wLocation[e]+" .weather-temperature").html(weather.temp+'&deg;'+weather.units.temp);
          $("#"+wLocation[e]+" .weather-description").html(weather.currently);
        },
        error: function(error) {
          $("#"+wLocation[e]+"").html('<p>'+error+'</p>');
        }
      });
    });
}
function initTimeLines() {
  tlLoading = new TimelineMax({repeat:-1})
  .from($(".s1"),.4,{rotation: "-=180"},"#1")
  .from($(".s2"),.5,{rotation: "-=180"},"#1")
  .from($(".s3"),.6,{rotation: "-=180"},"#1")
  .from($(".s4"),.7,{rotation: "-=180"},"#1")
  .pause();

  tlDisplay = new TimelineMax()
  .to($(".squares"),.2,{autoAlpha: 0})
  .to($(".squares"),.45,{height: 0},"#1")
  .from($(".image"),.5,{height: 0},"#1")
  .from($(".image"),.2,{autoAlpha: 0, marginTop: "-20"})
  .from($("#greetings-board"),.2,{autoAlpha: 0, marginTop: "-20"})
  .from($("#weather-board"),.2,{autoAlpha: 0, marginTop: "-20"})
  .from($("#terminal-board"),.2,{autoAlpha: 0, marginTop: "-20"})
  .timeScale(1.2)
  .pause();
}
function initClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10)
        dd='0'+dd
    if(mm<10)
        mm='0'+mm
    if(m<10)
      m='0'+m
    if(s<10)
      s='0'+s

    $(".time-hours").html(h);
    $(".time-minutes").html(m);
    $(".time-seconds").html(s);
    $(".date-day").html(dd);
    $(".date-month").html(mm);
    $(".date-year").html(yyyy);

    if(h<12){
      $(".greetings-title").html("Good Morning");
    } else if (h>=12 && h<19){
      $(".greetings-title").html("Good Afternoon");
    } else {
      $(".greetings-title").html("Good Evening");
    }

    var t = setTimeout(initClock, 500);
}