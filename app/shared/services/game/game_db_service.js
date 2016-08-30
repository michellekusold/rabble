(function(){
  'use strict';
  angular.module('rabble.services').factory('gameDbServiceFactory', gameDbServiceFactory);
  gameDbServiceFactory.$inject = ["humanCodeServiceFactory", "$cookies", "$cookieStore"]
  function gameDbServiceFactory(humanCodeServiceFactory, $cookies, $cookieStore){
    var fb = firebase.database();

  /* PRIVATE FUNCTIONS */
  function ensureUniqueGameCode(newGameKey){
    var gameCode = humanCodeServiceFactory.makeHumanReadableGameCode();

    return fb.ref('games/').orderByChild("code").startAt(gameCode).endAt(gameCode).once('value').then(function(snapshot){
        var code = [];
        var counter = 0;
        for(a in snapshot.val()){
          if(a != newGameKey){
            code[counter] = a;
            counter++;
          }
        }
        if(code.length == 0){
          // add the game code to the db if it is unique
          fb.ref('games/' + newGameKey).set({
              gameId: newGameKey,
              code: gameCode,
              orderType: "",
              order: [],
              players: ""
          });
          return gameCode;
        }
        return false;
      });

    }

/* PUBLIC FUNCTIONS */
    // PROMISE: create new game in DB. returns gameId and unique game code
    var createGame = function(){
      var newGameKey = fb.ref().child('games').push().key;

      // create a new game code and only push it if it is unique
      var uniqueCode = function() {
        return ensureUniqueGameCode(newGameKey).then(function(isUnique) {
          if(!isUnique) {
            return uniqueCode();
          }
          var gameCode = isUnique;
          return gameCode;
        })
      }

    var newGame = function() {
      return uniqueCode()
        .then(function(gameCode){
          // promise fulfilled
          $cookies.put("gameId", newGameKey);
          if(gameCode){
            $cookies.put("gameCode", gameCode);
            return {id: newGameKey, code: gameCode};
          }
          else{
            return {id: newGameKey, code: null};
          }
        }, function(error){
            // promise rejected
            console.error(error);
        });
    }
      return newGame();
    }

    var getGameByCode = function(code){
      return fb.ref('games/').orderByChild("code").startAt(code).endAt(code).once('value').then(function(snapshot){
        var gameId = null;
        var game = snapshot.val();
        for(var value in game){
          if(value.charAt(0) == '-'){
            gameId = value;
            $cookies.put("gameId", gameId);
            $cookies.put("gameCode", code);
          }
        }
        return gameId;
      });
    }

    return{
      createGame: createGame,
      getGameByCode: getGameByCode
    }
  }
})();
