(function () {
angular.module('rabble.controllers').controller("playController", playController);
playController.$inject = ["$scope", "$state", "playerModel", "paperStackModel", "playerDbServiceFactory", "gameDbServiceFactory"];

function playController($scope, $state, playerModel, paperStackModel, playerDbServiceFactory, gameDbServiceFactory){
  var vm = this;

  vm.canvas = null;
  vm.canvasInit = canvasInit;
  vm.clearCanvas = clearCanvas;
  vm.code = null;
  vm.gameId = null;
  vm.goTo = $scope.nav.goTo;
  vm.invalidCode = false;
  vm.playerModel = playerModel.getPlayerModel();
  vm.reloadCanvas = reloadCanvas;
  vm.saveCanvas = saveCanvas;
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

  function canvasInit(){
    // set the canvas size to fill the current screen
    vm.canvas = this._canvas = new fabric.Canvas('draw', {
        isDrawingMode: true
      });

    vm.canvas.setDimensions({width: window.innerWidth, height: window.innerHeight});

    vm.canvas.freeDrawingBrush.width = 10;
    vm.canvas.freeDrawingBrush.color = "black";

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
      if(vm.canvas){
            vm.canvas.setDimensions({width: window.innerWidth, height: window.innerHeight});
      }
    }
  }

  function saveCanvas(){
    if(vm.canvas){
        return JSON.stringify(vm.canvas);
    }
  }

  function clearCanvas(){
    if(vm.canvas){
      vm.canvas.clear();
    }
  }

  function reloadCanvas(jsonCanvas){
    if(vm.canvas){
        vm.canvas.loadFromJSON(jsonCanvas, vm.canvas.renderAll.bind(vm.canvas));
    };
  }
}
})();
