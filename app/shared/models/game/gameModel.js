(function(){
  'use strict';
  angular.module("rabble.models").factory("gameModel", gameModel);
  gameModel.$inject = ["gameDbServiceFactory"];
  function gameModel(gameDbServiceFactory){
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
        order: []
      };

      function syncDB(dbGame){
        if(dbGame.id){
          gameModel.id = dbGame.id;
        }
        if(dbGame.code){
          gameModel.code = dbGame.code;
        }
        if(dbGame.playerCount){
          gameModel.playerCount = dbGame.playerCount;
        }
        if(dbGame.orderType){
          gameModel.orderType = dbGame.orderType;
        }
        if(dbGame.order){
          gameModel.order = dbGame.order;
        }
      }

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
      var newGameModel = gameDbServiceFactory.createGame().then(function(dbGame){
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
            return dbGame;
          }
        });
        return newGameModel;
    }
  }
};
})();
