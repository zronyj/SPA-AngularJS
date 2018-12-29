(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckCtrl', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lista = "";
        $scope.checkItems = function () {
            $scope.message = splitCount($scope.lista);
        }

    }

    function splitCount(lunchString) {
        var detail = lunchString.replace(/ /g, '').split(',');
        detail = findAndRemoveBlanks(detail);
        var largo = detail.length;
        if (largo == 0) {
            return "Please enter data first";
        } else if (largo <= 3) {
            return "Enjoy!";
        } else {
            return "Too much!";
        }
    };

    // JS to find and remove empty items.
    function findAndRemoveBlanks(lunchArray) {
        if (lunchArray.length == 0 || lunchArray.indexOf("") == -1) {
            return lunchArray;
        } else {
            var ctrl = lunchArray.indexOf("");
            while (ctrl != -1) {
                lunchArray.splice(ctrl, 1);
                ctrl = lunchArray.indexOf("");
            }
            return lunchArray;
        }
    }

})();