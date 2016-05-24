'use strict';

var app = angular.module('spApp', ['ui.router', 'stormpath', 'stormpath.templates']);

app.run(function($stormpath){
  $stormpath.uiRouter({
    loginState: 'login',
    defaultPostLoginState: 'home'
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login', { url: '/login', templateUrl: '/html/login.html' })
    .state('register', { url: '/register', templateUrl: '/html/register.html' })

    .state('profile', { url: '/profile', templateUrl: '/html/profile.html',
    controller: 'profileCtrl', sp: {authenticate: true}

    // resolve: {
    //   USER: function($user) {
    //     return $user.get();
    //   }
    // }

    //
     })
    .state('quotes', {
      url:'/quotes',
      templateUrl: '/html/quotes.html',
      controller: 'quotesCtrl'
      ,resolve: {
        SimpleEBayResolve: function(SimpleEBayService) {
          return SimpleEBayService.getItemAll();
          // return 'SimpleEBayService.getItemAll();'
        }
      }
    })

  $urlRouterProvider.otherwise('/')
});
