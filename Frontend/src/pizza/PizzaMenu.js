/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//this are filters
var Filters = {
    filter_button_all_pizza: {
        filter: "",
        title: "Усі піци"
    },
    filter_button_meat: {
        filter: "meat",
        title: "Піци з м'ясом"
    },
    filter_button_pineapples: {
        filter: "pineapple",
        title: "Піци з ананасами"
    },
    filter_button_mushrooms: {
        filter: "mushroom",
        title: "Піци з грибами"
    },
    filter_button_ocean: {
        filter: "ocean",
        title: "Піци з морепродуктами"
    },
    filter_button_tomato: {
        filter: "additional",
        title: "Вега піци"
    }
};

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
//filter buttons
var $filters = $(".pizza-filter-button");
//pizza counter
var $pizza_list_counter = $("#pizza-list-counter");

$filters.click(function() { 
    var id = $(this).attr("id");
    $(".pizza-filter-button.active").removeClass("active");
    $(this).addClass("active");
    var filter = Filters[id];
    filterPizza(filter);
});

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-button-big").click(function(event){
            event.preventDefault();
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        
        $node.find(".buy-button-small").click(function(event){
            event.preventDefault();
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    $pizza_list_counter.text(list.length);
    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    $("#filter-title").text(filter.title);
    query = filter.filter;

    Pizza_List.forEach(function(pizza){
        if(query == "additional" && pizza.content['meat']) {
            return;
        }
        if(!query || pizza.content[query]) {
            pizza_shown.push(pizza);
        }

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;