$(document).ready(function() {

  var city = geoplugin_city();
  var state = geoplugin_region();
  var country = geoplugin_countryName();
  var latitude = geoplugin_latitude();
  var longitude = geoplugin_longitude();
  //images: ["sun","cloud","rain","snow","fog","thunder"];
  var images = ["http://randomwallpapers.net/nature-sunny-tree-2560x1440-wallpaper236910.jpg", "https://www.ndsu.edu/nd_geology/nd_weather/images_weather/wall_cloud_dawson_nd1.jpg", "https://images.alphacoders.com/120/120313.jpg", "http://wp.streetwise.co/wp-content/uploads//2014/10/Screen-Shot-2014-10-28-at-8.27.12-AM1.png", "http://iliketowastemytime.com/sites/default/files/foggy-morning-river-hd-wallpaper.jpg", "http://www.cbc.ca/doczone/content/images/episodes/waethergonewiild_1280.jpg"];

  $("#location").html("<div>" + city + "</div>");

  var temp;
  var arr;
  var main, desc, icon;

  $.ajax({
    // 5 day forecast : ..api.openweathermap.org/data/2.5/forecast?lat=..
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric" + "&APPID=e9ac616cdae9b774f8067cc80eab9b23",
    dataType: "text",
    success: function(data) {

      data = JSON.parse(data);
      data = JSON.stringify(data);

      arr = data.split(',');

      $.each(data, function() {
        $.each(this, function(key, val) {});

        main = arr[3];
        main = main.substring(8, main.length - 1);
        $("#weather").html(main);

        desc = arr[4];
        desc = desc.substring(15, desc.length - 1);
        $("#weather").append(" - " + desc);

        icon = arr[5];
        icon = icon.substring(8, icon.length - 3);

        var iconIndex;
        var backgroundIndex;

        switch (icon) {
          case "01d":
            backgroundIndex = 0;
            iconIndex = 0;
            break;
          case "02d":
            backgroundIndex = 0;
            iconIndex = 1;
            break;
          case "03d":
            backgroundIndex = 1;
            iconIndex = 2;
            break;
          case "04d":
            backgroundIndex = 1;
            iconIndex = 3;
            break;
          case "09d":
            backgroundIndex = 2;
            iconIndex = 4;
            break;
          case "10d":
            backgroundIndex = 2;
            iconIndex = 5;
            break;
          case "11d":
            backgroundIndex = 5;
            iconIndex = 6;
            break;
          case "13d":
            backgroundIndex = 3;
            iconIndex = 7;
            break;
          case "50d":
            backgroundIndex = 4;
            iconIndex = 8;
            break;
          case "01n":
            backgroundIndex = 0;
            iconIndex = 9;
            break;
          case "02n":
            backgroundIndex = 0;
            iconIndex = 10;
            break;
          case "03n":
            backgroundIndex = 1;
            iconIndex = 11;
            break;
          case "04n":
            backgroundIndex = 1;
            iconIndex = 12;
            break;
          case "09n":
            backgroundIndex = 2;
            iconIndex = 13;
            break;
          case "10n":
            backgroundIndex = 2;
            iconIndex = 14;
            break;
          case "11n":
            backgroundIndex = 5;
            iconIndex = 15;
            break;
          case "13n":
            backgroundIndex = 3;
            iconIndex = 16;
            break;
          case "50n":
            backgroundIndex = 4;
            iconIndex = 17;
            break;
        }

        var icons = ["http://openweathermap.org/img/w/01d.png", "http://openweathermap.org/img/w/02d.png", "http://openweathermap.org/img/w/03d.png", "http://openweathermap.org/img/w/04d.png", "http://openweathermap.org/img/w/09d.png", "http://openweathermap.org/img/w/10d.png", "http://openweathermap.org/img/w/11d.png", "http://openweathermap.org/img/w/13d.png", "http://openweathermap.org/img/w/50d.png", "http://openweathermap.org/img/w/01n.png", "http://openweathermap.org/img/w/02n.png", "http://openweathermap.org/img/w/03n.png", "http://openweathermap.org/img/w/04n.png", "http://openweathermap.org/img/w/09n.png", "http://openweathermap.org/img/w/10n.png", "http://openweathermap.org/img/w/11n.png", "http://openweathermap.org/img/w/13n.png", "http://openweathermap.org/img/w/50n.png"];

        $("#icon").html("<div>" + "<img src='" + icons[iconIndex] + "'>" + "</div>");

        $("#bg").css("background-image", "url('" + images[backgroundIndex] + "')");

        temp = arr[7];
        temp = temp.substring(15, temp.length);
        temp = temp * 1.0;
        temp = temp.toPrecision(2);
        $("#temp").html(temp + "&deg;C");

      });

    }

  });

  var units = "Switch to Farenheight";
  $("#units").html(units);
  $("#units").click(function() {

    if (units == "Switch to Farenheight") {
      units = "Switch to Celsius";
      temp = (temp * 9 / 5 + 32) / 1.0;
      temp = temp.toPrecision(2);
      $("#temp").html(temp);
      $("#temp").append("&deg;F")
    } else {
      units = "Switch to Farenheight";
      temp = ((temp - 32) * 5 / 9) / 1.0;
      temp = temp.toPrecision(2);
      $("#temp").html(temp);
      $("#temp").append("&deg;C")
    }

    $("#units").html(units);

  });
  
});