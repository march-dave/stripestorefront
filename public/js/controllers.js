'use strict';

var app = angular.module('spApp');

app.controller('profileCtrl', function($scope, $user, $timeout, SimpleEBayService) {

  $scope.loading = true;
  // $scope.user = USER;

  $user.get()
  .then(user => {
    console.log('user', user);
    $scope.user = user;
  })
  .catch(err => {
    console.log('err', err);
  })
  .finally(() => {
    $scope.loading = false;
  })

  $scope.edit = () => {

    $scope.editing = true;
    $scope.edituser = angular.copy($scope.user);

    $scope.editUser = {
     firstname: $scope.user.givenName,
     middlename: $scope.user.middlename,
     lastname: $scope.user.surname
    //  favoriteColor: $scope.user.customData.favoriteColor
   };
  }

  $scope.cancelEdit = () => {
    $scope.editing = fase;
    $scope.editing = null;
  }

  $scope.saveEdit = () => {

    $http.put('/users/me', $scope.editUser)
    .then(res=> {

        $user.get()
          .then(user => {
            $scope.user = res.data;
            $scope.cancelEdit();
          })
      // console.log('res'), res;
    })
    .catch(err => {
      console.log('err', err);
    })
  }
});

app.controller('quotesCtrl', function($scope, $state, SimpleEBayResolve, SimpleEBayService, $rootScope) {

  $scope.items = SimpleEBayResolve;
  $scope.addBidding = function(newBid, itemID) {

      newBid.itemref = itemID;
      SimpleEBayService.addBid(newBid);
  };

  SimpleEBayService.getBidAll().then(function (data) {
      $scope.bids = data;
  });

});
