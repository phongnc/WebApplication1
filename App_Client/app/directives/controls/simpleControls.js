// simpleControls.js
(function () {
  "use strict";

  angular.module("simpleControls", [])
    .directive("simpleSpinner", simpleSpinner);

  function simpleSpinner() {
    return {
      scope: {
        show: "=displayWhen"
      },
      restrict: "E",
      templateUrl: "App_Client/app/directives/controls/Spinner.html"
    };
  }

})();