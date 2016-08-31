(function(){
  'use strict';
  angular.module("rabble.models").factory("paperStackModel", paperStackModel);
  paperStackModel.$inject = [];
  function paperStackModel(){

      var paperStackModel = {
        id: null,
        ownerId: null,
        drawings: []
      };

  return{
    getPaperStackModel: function(){
      return paperStackModel;
    }
  }
};
})();
