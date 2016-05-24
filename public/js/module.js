'use strict';

var app = angular.module('authApp', ['ui.router', 'satellizer', 'stripe.checkout']);

// app.run(function(Auth) {
//   Auth.getProfile();
// });

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $authProvider.github({
    clientId: '20dde4e1b29be8b7a4ce'
  });

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })
    .state('register', {
      url: '/register',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/authForm.html',
      controller: 'authFormCtrl'
    })
    .state('quotes', {
      url:'/quotes',
      templateUrl: '/html/quotes.html',
      controller: 'quotesCtrl'
      ,resolve: {
        SimpleEBayResolve: function(SimpleEBayService) {
          return SimpleEBayService.getItemAll();
        }
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl'
      // resolve: {
      //   profile: function(Auth, $q, $state) {
      //     return Auth.getProfile()
      //     .catch(() => {
      //       $state.go('home');
      //       return $q.reject();
      //     });
      //   }
      // }
    })



  $urlRouterProvider.otherwise('/');
});

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  };
});


// 'use strict';
//
// var app = angular.module('spApp', ['ui.router', 'stormpath', 'stormpath.templates']);
//
// app.run(function($stormpath){
//   $stormpath.uiRouter({
//     loginState: 'login',
//     defaultPostLoginState: 'home'
//   });
// });
//
// app.config(function($stateProvider, $urlRouterProvider) {
//
//   $stateProvider
//     .state('home', { url: '/', templateUrl: '/html/home.html' })
//     .state('login', { url: '/login', templateUrl: '/html/login.html' })
//     .state('register', { url: '/register', templateUrl: '/html/register.html' })
//
//     .state('profile', { url: '/profile', templateUrl: '/html/profile.html',
//     controller: 'profileCtrl', sp: {authenticate: true}
//
//     // resolve: {
//     //   USER: function($user) {
//     //     return $user.get();
//     //   }
//     // }
//
//     //
//      })
//     .state('quotes', {
//       url:'/quotes',
//       templateUrl: '/html/quotes.html',
//       controller: 'quotesCtrl'
//       ,resolve: {
//         SimpleEBayResolve: function(SimpleEBayService) {
//           return SimpleEBayService.getItemAll();
//           // return 'SimpleEBayService.getItemAll();'
//         }
//       }
//     })
//
//   $urlRouterProvider.otherwise('/')
// });
