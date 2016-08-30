(function(){
  'use strict';
  angular.module('rabble.services').factory('playerDbServiceFactory', playerDbServiceFactory);
  playerDbServiceFactory.$inject = ["$cookies", "$cookieStore"]
  function playerDbServiceFactory($cookies, $cookieStore){
    var fb = firebase.database();

    var joinGame = function(gameId){
      var playerId = fb.ref().child('games').child(gameId).child('players').push().key;
      fb.ref('games/' + gameId + '/players/' + playerId).set({
          playerId: playerId,
          name: "",
          stackId: null
      });
      $cookies.put("playerId", playerId);
      return playerId;
    }

    var setName = function(name){
      var gameId = $cookies.get("gameId");
      var playerId = $cookies.get("playerId");
      fb.ref('games/' + gameId + '/players/' + playerId).update({
          name: name
      });
    }

    return{
      joinGame: joinGame,
      setName: setName
    }
  }
})();
