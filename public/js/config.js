app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateURL: 'views/view.html'
  })

  .otherwise({
    redirectTo: '/'
  });
});
