app.controller('MainController', ['$scope', '$http', function($scope, $http) {
  var socket = io();

  socket.on('message', function(data) {
    console.log(JSON.parse(data));
  });

  $scope.location = {
    search : "",
    latitude : "",
    longitude : "",
  }

  $scope.search = function(){
    //use search into google api
    var fullurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.location.search + '&key=AIzaSyDgUJ0fS8mvxEyKc_U_B3UCBauZxqWuHq0';
    $http({
      method: 'GET',
      url: fullurl,
    }).then(function successCallback(response) {
      //updates location variables
      $scope.location.latitude = response.data.results[0].geometry.location.lat;
      $scope.location.longitude = response.data.results[0].geometry.location.lng;
      // this callback will be called asynchronously
      // when the response is available

      var data = {
        lat: $scope.location.latitude,
        lng: $scope.location.longitude
      }
      socket.send(JSON.stringify(data));
    }, function errorCallback(response) {
      console.log("Failed connecting to the Google geocode api");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  //called when 'get current location' button is pressed
  $scope.currentLocation = function() {
    var fullurl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAaSTJi-tg0r1-ukV5rMdUOaMGqQxL3nJQ';
    $http({
      method: 'POST',
      url: fullurl,
    }).then(function successCallback(response) {
      //updates the location variables
      console.log(response);
      $scope.location.latitude = response.data.location.lat;
      $scope.location.longitude = response.data.location.lng;
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      console.log("Failed connecting to the Google geocode api");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

}]);
