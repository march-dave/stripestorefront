'use strict';

var app = angular.module('authApp');

app.controller('profileCtrl', function() {
  console.log('profileCtrl!');
});

app.controller('mainCtrl', function($scope, $state, $auth) {

  $scope.logout = () => {
    $auth.logout();
  }

  $scope.isAuthenticated = () => {
    return $auth.isAuthenticated();
  }

});

app.controller('homeCtrl', function($scope) {
  console.log('homeCtrl!');
});



app.controller('authFormCtrl', function($scope, $state, $auth) {
  console.log('authFormCtrl!');

  $scope.currentState = $state.current.name;

  $scope.authenticate = provider => {
    $auth.authenticate(provider);
  };

  $scope.submitForm = () => {
    if($scope.currentState === 'register') {

      // register user
      if($scope.user.password !== $scope.user.password2) {

        $scope.user.password = '';
        $scope.user.password2 = '';

        alert('Passwords must match.')
      } else {
        $auth.signup($scope.user)
          .then(res => {
            return $auth.login($scope.user);
          })
          .then(res => {
            $state.go('home');
          })
          .catch(res => {
            alert(res.data.error);
          });
      }
    } else {
      $auth.login($scope.user)
      // email / password from form
      // post it to /auth/login

        .then(res => {
          $state.go('home');
        })
        .catch(res => {
          alert(res.data.error);
        })
    }
  };

});


// 'use strict';
//
// var app = angular.module('spApp');
//
// app.controller('profileCtrl', function($scope, $user, $timeout, SimpleEBayService) {
//
//   $scope.loading = true;
//   // $scope.user = USER;
//
//   $user.get()
//   .then(user => {
//     console.log('user', user);
//     $scope.user = user;
//   })
//   .catch(err => {
//     console.log('err', err);
//   })
//   .finally(() => {
//     $scope.loading = false;
//   })
//
//   $scope.edit = () => {
//
//     $scope.editing = true;
//     $scope.edituser = angular.copy($scope.user);
//
//     $scope.editUser = {
//      firstname: $scope.user.givenName,
//      middlename: $scope.user.middlename,
//      lastname: $scope.user.surname
//     //  favoriteColor: $scope.user.customData.favoriteColor
//    };
//   }
//
//   $scope.cancelEdit = () => {
//     $scope.editing = fase;
//     $scope.editing = null;
//   }
//
//   $scope.saveEdit = () => {
//
//     $http.put('/users/me', $scope.editUser)
//     .then(res=> {
//
//         $user.get()
//           .then(user => {
//             $scope.user = res.data;
//             $scope.cancelEdit();
//           })
//       // console.log('res'), res;
//     })
//     .catch(err => {
//       console.log('err', err);
//     })
//   }
// });
//
app.controller('quotesCtrl', function($scope, $state, Payment, SimpleEBayResolve, SimpleEBayService, $rootScope) {

  SimpleEBayService.getItemAll().then(function (result) {
      $scope.bids = result.data;
  });


  $scope.doCheckout = function(token) {

    console.log('toke : ', token);
    console.log('selectedBidId :', $scope.selectedBidId);

     Payment.completeCheckout(token, $scope.selectedBidId)
       .then(res => {
         console.log('res:', res);
       });
   }

  $scope.selectBid = function(id) {
   $scope.selectedBidId = id;
 };

});



app.service('Payment', function($http) {
  this.completeCheckout = function(token, bidId) {
    return $http.post('/api/payment', { token: token, bidId: bidId });
  };
});

app.service('Bid', function($http) {
  this.getAll = () => {
    return $http.get('/api/bids');
  };
});
