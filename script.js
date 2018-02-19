$(document).ready(function(){
    var currentLocation = {

    };
    function current(){
        navigator.geolocation.getCurrentPosition(function(position) {
             currentLocation.lat = position.coords.latitude;
             currentLocation.long = position.coords.longitude;
            location();
        });

    }
   
    function location(){
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+currentLocation.lat + "&lon="+ currentLocation.long, function(data){
                //console.log(data);
            $("#main").text(data.weather[0].main);
                $("#temp").text(data.main.temp);
                $("#city").text(data.name + ", " + data.sys.country);
                if (data.weather[0].main == "Clear"){
                    console.log("working");
                    $("body").css("backgroundImage", "url(https://cdn.thinglink.me/api/image/769384742914097152/1240/10/scaletowidth)");
                    $("#ic").html("<div class='sunny'></div>")
                }
                else if (data.weather[0].main == "Thunderstorm" || data.weather[0].main == "Extreme"){
                    $("body").css("backgroundImage", "url(https://kormorant.co.za/wp-content/uploads/sites/60/2017/10/Thunderstorm.jpg)");
                    $("#ic").html("<div class='thundery'><div class='thundery__cloud'></div><div class='thundery__rain'></div></div>");
                }
                else if (data.weather[0].main == "Drizzle"){
                    $("body").css("backgroundImage", "url(https://img00.deviantart.net/ea88/i/2012/198/6/b/drizzle__by_niki91-d57kcpt.jpg)");
                    $("#ic").html("<div class='icon sun-shower'><div class='cloud'></div><div class='sun'><div class='rays'></div></div><div class='rain'></div></div>");
                }
                else if (data.weather[0].main == "Rain"){
                    $("body").css("backgroundImage", "url(https://www.pixelstalk.net/wp-content/uploads/2016/04/Rain-on-glass-wallpaper-HD.jpg)");
                    $("#ic").html("<div class='rainy'><div class='rainy__cloud'></div><div class='rainy__rain'></div></div>");
                }
                else if (data.weather[0].main == "Snow"){
                    $("body").css("backgroundImage", "url(http://www.news1130.com/wp-content/blogs.dir/sites/9/2015/12/26/iStock_000051500010_Double.jpg)");
                    $("#ic").html("<div class='cloudy'></div><div class='partly_cloudy__cloud'></div>");
                }
                else if (data.weather[0].main == "Clouds"){
                    $("body").css("backgroundImage", "url(http://www.weatherwizkids.com/wp-content/uploads/2015/04/fog6.jpg)");
                    $("#ic").html("<div class='cloudy'></div>");
                }
                else {
                    $("body").css("backgroundImage", "url(http://weknowyourdreams.com/images/fog/fog-01.jpg)");
                    $("#ic").html("<div class='cloudy'></div><div class='partly_cloudy__cloud'></div>");
                }
            });
        }
          
        current();
//console.log(currentLocation);    


$("div p a").on("click", function(){
    if ($("div p a").text() === "C"){
        var c = $("#temp").text();
        $("#temp").text(Math.round(((c * 9/5) + 32)*100)/100);
        $("div p a").text("F");
    }
    else {
        var f = $("#temp").text();
        $("#temp").text(Math.round(((f - 32) * (5/9)) * 100)/100);
        $("div p a").text("C")
    }
});
$("button").on("click", function(){
    var query = $("input").val();
    $("div p a").text("C");
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+ query + "&key=AIzaSyD7y5QhpzNBztGl_UQxfF_TM68cNqLE00k", function(add){
        console.log(add);
        console.log(add.results[0].geometry.location);
        currentLocation.lat = add.results[0].geometry.location.lat;
        currentLocation.long = add.results[0].geometry.location.lng;
        location();
    });
});
      
   

});