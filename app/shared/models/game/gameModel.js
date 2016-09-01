(function(){
  'use strict';
  angular.module("rabble.models").factory("gameModel", gameModel);
  gameModel.$inject = ["gameDbServiceFactory", "$q"];
  function gameModel(gameDbServiceFactory, $q){
      var ORDER_TYPE = {
        clockwise: "CLOCKWISE",
        counterclockwise: "COUNTER_CLOCKWISE",
        defaultorder: "DEFAULT_ORDER"
      };

      var gameModel = {
        id: null,
        code: null,
        playerCount: null,
        orderType: null,
        order: [],
        players: []
      };

  return{
    getGameModel: function(){
      return gameModel;
    },
    cleanGameModel: function(){
      gameModel = {
        id: null,
        code: null,
        orderType: null,
        players: [],
        order: []
      };
    },
    newGame: function(){
      var newGamePromise = $q.defer();
      gameDbServiceFactory.createGame().then(function(dbGame){
          if(dbGame){
            if(dbGame.id){
              gameModel.id = dbGame.id;
            }
            if(dbGame.code){
              gameModel.code = dbGame.code;
            }
            if(dbGame.orderType){
              gameModel.orderType = dbGame.orderType;
            }
            if(dbGame.order){
              gameModel.order = dbGame.order;
            }
            if(dbGame.players){
              gameModel.players = dbGame.players;
            }
            newGamePromise.resolve(dbGame);
          }
        });
        return newGamePromise.promise;
    },
    getActivePlayers: function(callback){
      var getActivePlayersPromise = $q.defer();
        gameDbServiceFactory.getActivePlayers(gameModel.id, function(activePlayers) {
          if(activePlayers){
            gameModel.players = activePlayers;
            callback(gameModel);
          }
        });
    }
  }
};
})();
