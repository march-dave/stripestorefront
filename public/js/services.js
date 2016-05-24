'use strict';

var app = angular.module('authApp');

app.service('Auth', function($http, $q) {

  this.register = userObj => {
    return $http.post('/api/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/api/users/login', userObj)
      .then(res => {
        return this.getProfile();
      });
  };

  this.logout = () => {
    return $http.delete('/api/users/logout')
      .then(res => {
        this.currentUser = null;
        return $q.resolve();
      });
  };

  this.getProfile = () => {
    return $http.get('/api/users/profile')
      .then(res => {
        this.currentUser = res.data;
        return $q.resolve(res.data);
      })
      .catch(res => {
        this.currentUser = null;
        return $q.reject(res.data);
      });
  };

});


// 'use strict';
//
// var app = angular.module('spApp');
//
// // localhost:3000/items
app.service('SimpleEBayService', function($http, $q) {
  this.getItemAll = () => {
    return $http.get('/api/items');
  }

  this.getBidAll = () => {
      return $http.get('/api/bids').then(res=>$q.resolve(res.data));

      // return $http({
      //   method: "GET",
      //   url: `/api/bids`,
      //   cache: false
      // })
      // .then(res => $q.resolve(res.data));
  };

  // this.getItemAll = () => {
  //   return $http({
  //     method: "GET",
  //     url: `/items`,
  //     cache: false
  //   })
  //   .then(res => $q.resolve(res.data));
  // };

  this.addBid = function(bid) {

    // var obj = {
    //    userref: '5737b23dfcb058aef76059f9',
    //    itemref: '5737c1409041926bf8a741f6',
    //    bidding: 12,
    //    name: 'name field12'
    // };

    // bid.itemref = '5737c1409041926bf8a741f6',
    // bid.userref = '5737b23dfcb058aef76059f9';
    bid.name = 'name field3';
    // bid.bidding = bid.price;

    // console.log('bid.price', bid);
    // console.log('obj', typeof obj);

    return $http.post(`/api/bids/addBid`, bid);
  };
});
