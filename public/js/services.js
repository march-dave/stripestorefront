'use strict';

var app = angular.module('spApp');

// localhost:3000/items
app.service('SimpleEBayService', function($http, $q) {
  // this.getItemAll = () => {
  //   return $http.get('/items');
  // }

  this.getBidAll = () => {
      // return $http.get('/bids').then(res=>$q.resolve(res.data));

      return $http({
        method: "GET",
        url: `/bids`,
        cache: false
      })
      .then(res => $q.resolve(res.data));
  };

  this.getItemAll = () => {
    return $http({
      method: "GET",
      url: `/items`,
      cache: false
    })
    .then(res => $q.resolve(res.data));
  };

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

    return $http.post(`/bids/addBid`, bid);
  };
});
