(function () {
  angular.module('rabble.controllers').controller("monitorController", monitorController);
  monitorController.$inject = ["$scope", "$state", "gameModel", "$cookies", "qrCodeGeneratorServiceFactory", "gameDbServiceFactory", "$q"];

  function monitorController($scope, $state, gameModel, $cookies, qrCodeGeneratorServiceFactory, gameDbServiceFactory, $q){
    var vm = this;

    vm.gameModel = gameModel.getGameModel();
    vm.goTo = $scope.nav.goTo;

    gameModel.newGame().then(function(){
      qrCodeGeneratorServiceFactory.generateQrCode("qrCode", vm.gameModel.code);
      gameModel.getActivePlayers(function(newGameModel){
        vm.gameModel = newGameModel;
      });
    });
}
})();
