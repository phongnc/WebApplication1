/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl($scope) {

    $scope.userName = 'Vasileios Kougioumtzis';
    $scope.helloText = 'Application DASHBOARD';
    $scope.descriptionText = 'Application skeleton for a typical AngularJS web app...';

};

angular
    .module('apoxcrm')
    .controller('MainCtrl', MainCtrl)