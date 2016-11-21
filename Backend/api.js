/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var crypto = require('crypto');

var PRIVATE_KEY = "dbsnf4Ep18YuARPyLjtkmr63HFwtrllBNRCk9k63";

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true
    });
};

exports.makeOrder = function(req, res){
    var input_data = req.body;
    var data = base64(JSON.stringify(input_data));
    var signature = sha1(PRIVATE_KEY+data+PRIVATE_KEY);
    res.send({
        data: data,
        signature: signature
    });
}

function base64(str){
    return new Buffer(str).toString('base64');
}

function sha1(str){
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('base64');
}