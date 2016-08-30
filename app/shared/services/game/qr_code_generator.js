(function(){
  'use strict';
  angular.module('rabble.services').factory('qrCodeGeneratorServiceFactory', qrCodeGeneratorServiceFactory);
// generate human readable code to be used to enter a game
  function qrCodeGeneratorServiceFactory(){
    function generateQrCode(elementId, gameCode, backgroundColor)
    {
      var lightColor = "#ffffff";
      if(backgroundColor){
        lightColor = backgroundColor;
      }
      var url = "/play/code?gameCode=" + gameCode;
      new QRCode(document.getElementById(elementId), {
        text: url,
        width: 200,
        height: 200,
        colorLight: lightColor,
        colorDark: "#000000"
      });
    }
    return{
      generateQrCode: generateQrCode
    }
  }
})();
