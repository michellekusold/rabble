(function(){
  'use strict';
  angular.module("rabble.models").factory("playerModel", playerModel);
  playerModel.$inject = ["gameDbServiceFactory", "playerDbServiceFactory"];
  function playerModel(gameDbServiceFactory, playerDbServiceFactory){

      var playerModel = {
        id: null,
        name: null,
        stackId: null
      };

  return{
    getPlayerModel: function(){
      return playerModel;
    },
    joinGame: function(gameId){
      playerModel.id = playerDbServiceFactory.joinGame(gameId);
    },
    setName: function(name){
      playerModel.name = playerDbServiceFactory.setName(name);
    }
  }
};
})();
