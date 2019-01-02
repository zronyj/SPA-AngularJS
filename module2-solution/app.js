(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('SLCOSrvc', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['SLCOSrvc'];
    function ToBuyController(SLCOSrvc) {
        var TBCtrl = this;
        TBCtrl.itemName = "";
        TBCtrl.itemQuantity = "";
        TBCtrl.addItem = function () {
            SLCOSrvc.addItem(TBCtrl.itemName, TBCtrl.itemQuantity);
            TBCtrl.itemName = "";
            TBCtrl.itemQuantity = "";
        };
        TBCtrl.remItem = function (itemIndex) {
            SLCOSrvc.remItem(itemIndex);
        };
        TBCtrl.buyItem = function (itemIndex) {
            SLCOSrvc.buyItem(itemIndex);
        };
        TBCtrl.items = SLCOSrvc.getToBuy();
    };

    AlreadyBoughtController.$inject = ['SLCOSrvc'];
    function AlreadyBoughtController(SLCOSrvc) {
        var ABCtrl = this;
        ABCtrl.clearItems = function () {
            SLCOSrvc.clsBought();
            ABCtrl.items = SLCOSrvc.getBought();
        };
        ABCtrl.items = SLCOSrvc.getBought();
    };

    function ShoppingListCheckOffService() {
        var SLCOSrvc = this;
        var toBuy = [
            { name: "Bread", quantity: "2 loafs"},
            { name: "Lettuce", quantity: "1 bag"},
            { name: "Jam", quantity: "3 packs"},
            { name: "Cheese", quantity: "2 packs"},
            { name: "Tomatos", quantity: "1 six-pack"},
            { name: "Mustard", quantity: "2 bottles"},
        ];
        var bought = [];
        SLCOSrvc.addItem = function (itemName, itemQuantity) {
            toBuy.push({name: itemName, quantity: itemQuantity});
        };
        SLCOSrvc.remItem = function (itemIndex) {
            toBuy.splice(itemIndex, 1);
        };
        SLCOSrvc.buyItem = function (itemIndex) {
            bought.push(toBuy[itemIndex]);
            toBuy.splice(itemIndex, 1);
        };
        SLCOSrvc.getToBuy = function () {
            return toBuy;
        };
        SLCOSrvc.getBought = function () {
            return bought;
        };
        SLCOSrvc.clsBought = function () {
            bought = [];
        };
    };
})();