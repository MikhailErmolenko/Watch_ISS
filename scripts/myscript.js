let lat, lng, unix_timestamp;
let infoWindow;

function moveISS () {
    $.getJSON('http://api.open-notify.org/iss-now.json', function(data) {

        lat = data['iss_position']['latitude'];
        lng = data['iss_position']['longitude'];   
        document.getElementById("coordinates").innerHTML = 'longitude: ' + lng + ', latitude: ' + lat;

        timeUTC(data['timestamp']);

        updatePosition();
    });
    setTimeout(moveISS, 5000);
}

function timeUTC(UNIX_timestamp) {  
  var a = new Date((UNIX_timestamp-10800) * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  document.getElementById("time").innerHTML = time;
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
  });
  marker = new google.maps.Marker({
    map,
  });
  infoWindow = new google.maps.InfoWindow();      
};

function updatePosition() {
      const pos = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };

      infoWindow.open(map);
      map.setCenter(pos);
      infoWindow.open(marker);
      marker.setPosition(pos);
}

function issCrew() {
  $.getJSON('http://api.open-notify.org/astros.json', function(data) {

        var crew = data.people.filter(e => e.craft == 'ISS')
        document.getElementById("amount").innerHTML = crew.length + ' space rangers on ISS';
        let crewDiv = document.getElementById("crew");
        while (crewDiv.firstChild) {
          crewDiv.removeChild(crewDiv.firstChild)
        }
        crew.forEach(e => {
          let div = document.createElement("div")
          div.append(e.name);
          crewDiv.append(div)
          console.log(e.name)
        });
    });
    setTimeout(issCrew, 5000);
}

window.initMap = initMap;
moveISS();
issCrew();