/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    var OrderPage = require("./Order");
    //var GoogleMap = require("./GoogleMap");
    var LiqPay = require("./LiqPay");

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
});