$.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (getip) {
  var currip = getip["ip"];
  var api_key = "at_kdfY4AAc57xrb6CVZLDmWh7RhJvIt";

  $(function () {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      data: { apiKey: api_key, ipAddress: currip },
      success: function (data) {
        let fried = data;
        console.log(fried);
        document.getElementById("data-ip").innerHTML = fried["ip"];
        document.getElementById("data-location").innerHTML =
          fried["location"]["city"] +
          ", " +
          fried["location"]["country"] +
          " " +
          fried["location"]["postalCode"];
        document.getElementById("data-timezone").innerHTML =
          "UTC" + fried["location"]["timezone"];
        document.getElementById("data-isp").innerHTML = fried["isp"];
        var lati = fried["location"]["lat"];
        var lang = fried["location"]["lng"];

        var map = L.map("map", {
          center: [lati, lang],
          zoom: 19,
          zoomControl: false,
        });
        var selfIcon = L.icon({ iconUrl: `/images/icon-location.svg` });
        var marker = L.marker([lati, lang], { icon: selfIcon }).addTo(map);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 22,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
      },
    });
  });
});

// IP INPUT
function ipinput() {
  var inputIp = document.getElementById("ipDataInput").value;
  // Ip searching
  var ip = inputIp;
  var api_key = "at_kdfY4AAc57xrb6CVZLDmWh7RhJvIt";

  $(function () {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      data: { apiKey: api_key, ipAddress: ip },
      success: function (data) {
        let steams = data;

        document.getElementById("data-ip").innerHTML = steams["ip"];
        document.getElementById("data-location").innerHTML =
          steams["location"]["city"] +
          ", " +
          steams["location"]["country"] +
          " " +
          steams["location"]["postalCode"];
        document.getElementById("data-timezone").innerHTML =
          "UTC" + steams["location"]["timezone"];
        document.getElementById("data-isp").innerHTML = steams["isp"];
        var latitude = steams["location"]["lat"];
        var langitude = steams["location"]["lng"];
        console.log(latitude, langitude);
        var container = L.DomUtil.get("map");
        if (container != null) {
          container._leaflet_id = null;
        }
        var map = L.map("map", {
          center: [latitude, langitude],
          zoom: 19,
          zoomControl: false,
        });

        var selfIcon = L.icon({ iconUrl: `/images/icon-location.svg` });
        var marker = new L.marker([latitude, langitude], {
          icon: selfIcon,
        }).addTo(map);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 22,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
      },
    });
  });
}
