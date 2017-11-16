
/*
 * Obtains weather for geolocation via Open Weather Map
 * API and updates HTML elements correspondingly.
 *
 */
$(document).ready(function() {

  // ideally app_id should be stored in a private config file
  var app_id = "e9ac616cdae9b774f8067cc80eab9b23";
  
  var city = geoplugin_city();
  var state = geoplugin_region();
  var country = geoplugin_countryName();
  var latitude = geoplugin_latitude();
  var longitude = geoplugin_longitude();
  
  var images = ["images/sunny.png", "images/suncloud.png","images/cloudy.png", 
                "images/rain.png", "images/storm.png", "images/foggy.png"];

  $("#location").html("<div>" + city + "</div>");

  var temp;
  var arr;
  var main, desc, icon;

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + 
        "&lon=" + longitude + "&units=metric" + "&APPID="+app_id,
    dataType: "text",
    success: function(data) {

      data = JSON.parse(data);
      data = JSON.stringify(data);

      arr = data.split(',');
      
      // display details in HTML elements
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

        // codes correspond to weather descriptions
        // see open weather map api site for details
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

        var icons = ["images/01d.png", "images/02d.png", "images/03d.png", "images/04d.png", 
                     "images/09d.png", "images/10d.png", "images/11d.png", "images/13d.png", 
                     "images/50d.png", "images/01n.png", "images/02n.png", "images/03n.png", 
                     "images/04n.png", "images/09n.png", "images/10n.png", "images/11n.png", 
                     "images/13n.png", "images/50n.png"];

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

  // enable switching to farenheight
  var units = "Switch to Farenheight";
  $("#units").html(units);
  $("#units").click(function() {
    // convert back to celsius
    if (units == "Switch to Farenheight") {
      units = "Switch to Celsius";
      temp = (temp * 9 / 5 + 32) / 1.0;
      temp = temp.toPrecision(2);
      $("#temp").html(temp);
      $("#temp").append("&deg;F")
    } else { // convert to farenheight
      units = "Switch to Farenheight";
      temp = ((temp - 32) * 5 / 9) / 1.0;
      temp = temp.toPrecision(2);
      $("#temp").html(temp);
      $("#temp").append("&deg;C")
    }

    $("#units").html(units);
  });
});
