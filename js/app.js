var app = angular.module('LocationApp', ['ngRoute']);

app.config(function($routeProvider){$routeProvider.when('/', {controller: 'HomeController', templateURL: 'views/home.html'}).when('/photos/:id',{controller:'PhotoController', templateURL: 'views/photoController'}).otherwise({redirectTo: '/'});
  
});