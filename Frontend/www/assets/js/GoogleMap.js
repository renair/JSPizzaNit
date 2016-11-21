var Map;
var CurrentMarker = null;
var CurrentPosition = null;
var HomePosition = "";
var $addressInput = $("#inputAdress input");
var $deliveryTime = $("#delivery-time");
var currentTimeout = setTimeout(function(){},500);
var directionsRenderer = "";

function initialize(){
    HomePosition = new google.maps.LatLng(50.464379,30.519131);
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setOptions({
        markerOptions:{
            visible: false
        }
    });
    var mapProperties = {
        center: HomePosition,
        zoom: 13
    };
    var element = document.getElementById("googleMap");
    Map = new google.maps.Map(element, mapProperties);
    directionsRenderer.setMap(Map);
    //set pizza marker
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
        map: Map,
        icon: "assets/images/map-icon.png"
    });
    
    Map.addListener("click", mapClickListener);
}

function setMarker(point){
    if(CurrentMarker){
        CurrentMarker.setMap(null);
    }
    var marker = new google.maps.Marker({
        position: point,
        map: Map,
        icon: "assets/images/home-icon.png"
    });
    CurrentMarker = marker;
    CurrentPosition = point;
}

//listen clicks on Map
function mapClickListener(location){
    var locationLatLng = location.latLng;
    geocodeLatLng(locationLatLng,function(error, address){
        if(!error){
            $addressInput.val(address);
            $("#delivery-place").text(address);
        }
    });
    setMarker(locationLatLng);
    calculateRoute(HomePosition, locationLatLng, function(error, duration){
        $deliveryTime.text(duration.text);
    });
}

//do this if user want to input address by themself
$addressInput.keypress(function(){
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(
        function(){
            geocodeAddress($addressInput.val(),function(error, coords){
                if(!error){
                    setMarker(coords);
                    calculateRoute(HomePosition, coords, function(error, duration){
                        $deliveryTime.text(duration.text);
                    });
                }
            });
        },
        3000
    );
});

function geocodeAddress(address, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
        {"address": address},
        function(results, status){
            if(status === google.maps.GeocoderStatus.OK && results[0]){
                var coords =  results[0].geometry.location;
                callback(null, coords);
            }
            else{
                callback(new Error("Can't find this location"));
            }
        }
    );
}

function geocodeLatLng(latLng, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
        {"location": latLng},
        function(results, status){
            if(status === google.maps.GeocoderStatus.OK && results[1]){
                var addres = results[1].formatted_address;
                callback(null, addres);
            }
            else{
                callback(new Error("Can't find this location"));
            }
        }
    );
}

function calculateRoute(A_latLng, B_latLng, callback){
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(
        {
            origin: A_latLng,
            destination: B_latLng,
            travelMode: google.maps.TravelMode.WALKING
        },
        function(response, status){
            if(status = google.maps.DirectionsStatus.OK){
                var route = response.routes[0].legs[0];
                directionsRenderer.setDirections(response);
                callback(null, route.duration);
            }
            else{
                callback(new Error("There is no route."));
            }
        }
    );
}

google.maps.event.addDomListener(window,"load",initialize);