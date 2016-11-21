LocalStorage = require("./LocalStorage");

Cart = LocalStorage.get("PizzaCart");

$PHONE_INPUTTER = $("#inputPhone");
$NAME_INPUTTER = $("#inputName");
$ADDRESS_INPUTTER = $("#inputAdress");

$ADDRESS_INPUTTER.find("input").keyup(function(){
    var regexp = /^[A-zА-яіїІЇ ',\-0-9]{3,}$/i;
    switcher($ADDRESS_INPUTTER, regexp);
});

$PHONE_INPUTTER.find("input").keyup(function(){
    var regexp = /^\+380\d{9}$/g;
    switcher($PHONE_INPUTTER, regexp);
});

$NAME_INPUTTER.find("input").keyup(function(){
    var regexp = /^[A-zА-яіїІЇ ,.']{3,15}$/i;
    switcher($NAME_INPUTTER, regexp);
});

function switcher($element, regexp){
    var $input = $element.find("input");
    if(regexp.test($input.val())){
        enableForm($element);
    }
    else if(!$input.val()){
        defaultForm($element);
    }
    else{
        disableForm($element);
    }
}

function enableForm($element){
    $element.addClass("has-success");
    $element.removeClass("has-error");
}

function disableForm($element){
    $element.removeClass("has-success");
    $element.addClass("has-error");
}

function defaultForm($element){
    $element.removeClass("has-success");
    $element.removeClass("has-error");
}