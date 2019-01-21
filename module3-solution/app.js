(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NIDController', NarrowItDownController)
        .service('MenuSS', MenuSearchService)
        .directive('foundItems', foundItems)
        .constant('MenuPath', "https://davids-restaurant.herokuapp.com");
    
    function foundItems() {
        var ddo = {
            templateUrl: 'Templates/items.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    };

    function FoundItemsController() {
        var list = this;
    };
    
    NarrowItDownController.$inject = ['MenuSS'];
    function NarrowItDownController(MenuSS) {
        var NIDController = this;

        NIDController.searchTerm = '';
        NIDController.message = '';

        NIDController.GetMenuItems = function () {
            var promesa = MenuSS.getMatchedMenuItems(NIDController.searchTerm);
            promesa.then(function (respuesta) {
                if (respuesta.length == 0 || NIDController.searchTerm == '') {
                    NIDController.message = 'Nothing found';
                    NIDController.menuItems = [];
                } else {
                    NIDController.message = '';
                    NIDController.menuItems = respuesta;
                }
            });
        };

        NIDController.removeItem = function (index) {
            NIDController.menuItems.splice(index,1);
        };
    };
    
    MenuSearchService.$inject = ['$http', 'MenuPath']
    function MenuSearchService($http, MenuPath) {
        var MenuSS = this;

        MenuSS.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method:'GET',
                url: ( MenuPath + "/menu_items.json")
            }).then(function (result){
                var found = [];
                for (let index = 0; index < result.data.menu_items.length; index++) {
                    if (result.data.menu_items[index].description.indexOf(searchTerm) != -1) {
                        found.push(result.data.menu_items[index]);
                    }
                }
                return found;
            }).catch(function (error) {
                console.log(error);
                return [];
            });
        };

    };
    
})();