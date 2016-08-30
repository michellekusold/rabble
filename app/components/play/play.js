(function () {
angular.module('rabble.controllers').controller("playController", playController);
playController.$inject = ["$scope", "$state", "playerModel", "playerDbServiceFactory", "gameDbServiceFactory"];

function playController($scope, $state, playerModel, playerDbServiceFactory, gameDbServiceFactory){
  var vm = this;

  vm.code = null;
  vm.gameId = null;
  vm.goTo = $scope.nav.goTo;
  vm.invalidCode = false;
  vm.playerModel = playerModel.getPlayerModel();
  vm.setName = setName;
  vm.userName = null;
  vm.validateCode = validateCode;

  // add the player to the game
  var joinGame = function(gameId){
    playerModel.joinGame(gameId);
    return vm.playerModel;
  }

  function validateCode(code){
    // get the gameId of the game with this code
    gameDbServiceFactory.getGameByCode(code).then(function(gameId){
      $scope.$applyAsync(function(){
        vm.gameId = gameId;
        if(vm.gameId){
          vm.playerModel = joinGame(vm.gameId);
          vm.goTo('play.name');
        }
        else{
          vm.invalidCode = true;
        }
      });
    });
  }

  function setName(){
    playerModel.setName(vm.userName);
    vm.goTo('play.waiting');
  }
}
})();
