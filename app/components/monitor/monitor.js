(function () {
  angular.module('rabble.controllers').controller("monitorController", monitorController);
  monitorController.$inject = ["$scope", "$state", "gameModel", "$cookies", "qrCodeGeneratorServiceFactory"];

  function monitorController($scope, $state, gameModel, $cookies, qrCodeGeneratorServiceFactory){
    var vm = this;
    vm.gameModel = null;
    vm.goTo = $scope.nav.goTo;


    gameModel.newGame().then(function(){
      $scope.$applyAsync(function(){
        vm.gameModel = gameModel.getGameModel();
        qrCodeGeneratorServiceFactory.generateQrCode("qrCode", vm.gameModel.code);
      })
    });
}
})();
