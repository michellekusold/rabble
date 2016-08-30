(function () {
angular.module('rabble.controllers').controller("homeController", homeController);
homeController.$inject = ["$scope", "$state",];

function homeController($scope, $state){
  var vm = this;

  vm.goTo = $scope.nav.goTo;
}
})();
