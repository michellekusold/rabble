(function(){
  'use strict';
  angular.module("rabble.models").factory("drawingModel", drawingModel);
  drawingModel.$inject = [];
  function drawingModel(){

      var drawingModel = {
        id: null,
        authorId: null,
        drawing: null
      };

  return{
    getDrawingModel: function(){
      return drawingModel;
    },
    setAuthor: function(playerId){
      drawingModel.authorId = playerId;
    },
    saveDrawing: function(drawingJSON){
      drawingModel.drawing = drawingJSON;
    },
  }
};
})();
