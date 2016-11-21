/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var LocalStorage = require('../LocalStorage');
var API = require('../API');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = LocalStorage.get("PizzaCart") ? LocalStorage.get("PizzaCart") : []; //default - []

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
//HTML element which represent amount of pizza types
var $count = $("#pizza-counter");
//HTML element which represents total price counter
var $total_price = $("#total_price");
//element for clearing cart
var $clear_cart = $(".clear-order");

$clear_cart.click(clearCart);

var $no_pizzas = $('<div class="no-order-text">Пусто в холодильнику?<br>Замовте піцу! </div>');

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    for(var i = 0;i < Cart.length;++i){
        if(Cart[i].pizza.id == pizza.id && Cart[i].size == size) {
            Cart[i].quantity += 1;
            updateCart();
            return;
        }
    }
    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });
    
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    
    var tmp_cart = []
    Cart.forEach(function(element){
        if(cart_item != element){
            tmp_cart.push(element);
        }
    });
    Cart = tmp_cart;
    
    //Після видалення оновити відображення
    updateCart();
}

function clearCart() {
    Cart = [];
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    $total_price.text(0);

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        
        $total_price.text(parseInt($total_price.text()) + cart_item.quantity * cart_item.pizza[cart_item.size].price);
        
        if(!cart_item.size){
            console.error(cart_item);
        }
        
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        
        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        
        $node.find(".minus").click(function(){
            //if not zero
            if(cart_item.quantity - 1){
                cart_item.quantity -= 1;
                
                //Оновлюємо відображення
                updateCart();
            }
            else {
                removeFromCart(cart_item);
                updateCart();
            }
        });
        
        $node.find(".remove-pizza").click(function() {
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.append($node);
    }
    if(Cart.length) {
        Cart.forEach(showOnePizzaInCart);
        $cart.remove(".no-order-text");
        $("#buy-button").removeAttr("disabled");
    }
    else {
        $cart.append($no_pizzas);
        $("#buy-button").attr("disabled","");
    }
    $count.text(Cart.length);
    LocalStorage.set("PizzaCart", Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;