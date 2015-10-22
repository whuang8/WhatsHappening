app.controller('MainController', ['$scope', '$http', function($scope, $http) {
  var socket = io();
  $scope.tweets = [];

  socket.on('message', function(data) {
    $scope.tweets.push(JSON.parse(data));
    $scope.$apply();
  });

  $scope.location = {
    search : "",
    latitude : "",
    longitude : "",
  };

  $scope.photos = [];

  $scope.doneSearching = false;
  $scope.loading = false;

  $scope.search = function(){
    if ($scope.location.search.length > 0) {
      $scope.tweets = [];
      $scope.photos = [];
      $scope.loading = true;

      //use search into google api
      var fullurl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.location.search + '&key=AIzaSyDgUJ0fS8mvxEyKc_U_B3UCBauZxqWuHq0';
      $http({
        method: 'GET',
        url: fullurl,
      }).then(function successCallback(response) {
        //updates location variables
        $scope.location.latitude = response.data.results[0].geometry.location.lat;
        $scope.location.longitude = response.data.results[0].geometry.location.lng;
        $scope.instagramPhotos();
        // this callback will be called asynchronously
        // when the response is available

        var data = {
          lat: $scope.location.latitude,
          lng: $scope.location.longitude
        };
        socket.send(JSON.stringify(data));

        $scope.doneSearching = true;
      }, function errorCallback(response) {
        console.log("Failed connecting to the Google geocode api");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  };

  //called when 'get current location' button is pressed
  $scope.currentLocation = function() {
    var fullurl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAaSTJi-tg0r1-ukV5rMdUOaMGqQxL3nJQ';
    $http({
      method: 'POST',
      url: fullurl,
    }).then(function successCallback(response) {
      //updates the location variables
      $scope.location.latitude = response.data.location.lat;
      $scope.location.longitude = response.data.location.lng;
      $scope.instagramPhotos();
        // this callback will be called asynchronously
        // when the response is available

        var data = {
          lat: $scope.location.latitude,
          lng: $scope.location.longitude
        };
        socket.send(JSON.stringify(data));

        $scope.doneSearching = true;
      // this callback will be called asynchronously
      // when the response is available

      $scope.doneSearching = true;
    }, function errorCallback(response) {
      console.log("Failed connecting to the Google geocode api");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };


  $scope.instagramPhotos = function() {
    var fullurl = 'https://api.instagram.com/v1/media/search?distance=100&lat=' + $scope.location.latitude + '&lng=' + $scope.location.longitude + '&access_token=' + '13731455.02d116e.408adf79d6a04c1496f76dea6771552c&callback=JSON_CALLBACK';
    $http.jsonp(fullurl)
    .success(function(response) {
      //updates Instagram photos
      $scope.doneSearching = true;
      $scope.loading = false;

      var length = response.data.length;
      for (var i = 0; i < length; i++) {
        var c = response.data[i].caption;
        if (c === null) {
          $scope.photos.push({
            image: response.data[i].images.standard_resolution.url,
            caption: ''
          });
        }
        else {
          $scope.photos.push({
            image: response.data[i].images.standard_resolution.url,
            caption: c.text
          });
        }
      }
    })
    .error(function(response) {
      console.log("Failed connecting to the Instagram api");
      $scope.loading = false;
    });
  };
}]);
