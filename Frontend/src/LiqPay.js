var API = require("./API");

function createDescription(pizza_cart){
    var result = $("#inputPhone input").val() + " " + $("#inputAdress input").val() + " " + $("#inputName input").val() + " ";
    pizza_cart.forEach(function(element){
        result += element.pizza.title + " ";
    });
    return result;
}

$("#send-order").click(function(){
    if(!$("#inputPhone").hasClass("has-success") || !$("#inputAdress").hasClass("has-success") || !$("#inputName").hasClass("has-success")){
        return;
    }
    
    var data = {
        version: 3,
        public_key: "i76764037953",
        action: "pay",
        amount: $("#total_price").text(),
        currency: "UAH",
        description: createDescription(Cart),
        order_id: Math.random(),
        sandbox: 1
    };
    console.log(data);
    
    API.makeOrder(data, function(err,response){
        if(!err){
            console.log("data returned");
            LiqPayCheckout.init({
                data: response.data,
                signature: response.signature,
                embedTo: "#liqpay",
                mode: "popup"
            }).on("liqpay.callback",function(data){
                console.log(data);
                console.log(data.status);
            }).on("liqpay.ready",function(data){
                
            }).on("liqpay.close",function(data){
                
            });
        }
    });
});