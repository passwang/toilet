var MongoClient = require("mongodb").MongoClient;

function _connectDB(callback) {
    var url = "mongodb://localhost:27017/toiletData";
    MongoClient.connect(url, function (err, db) {
        callback(err, db);
    })
}
//增
exports.insertArray = function (collectionName, array, callback) {
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).insertMany(array, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}
//查
exports.find = function (collectionName, json, C, D) {
     if (arguments.length == 3) {
         //那么参数C就是callback，参数D没有传。
         var callback = C;
         var skipnumber = 0;
         //数目限制
         var limit = 0;
     } else if (arguments.length == 4) {
         var callback = D;
         var args = C;
         //应该省略的条数
         var skipnumber = args.pageamount * args.page || 0;
         //数目限制
         var limit = args.pageamount || 0;
         //排序方式
         var sort = args.sort || {};
     } else {
         throw new Error("find函数的参数个数，必须是3个，或者4个。");
         return;
     }
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).find(json).limit(limit).skip(skipnumber).sort(sort).toArray(function (err, docs) {
            callback(err, docs);
            db.close();
        })
    })
}
//删
exports.delete = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).deleteOne(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}
//改
exports.update = function (collectionName, json, json2, callback) {
    _connectDB(function (err, db) {
        if (err) {
            callback(err, db);
            db.close();
        }
        db.collection(collectionName).updateOne(json, json2, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}
//总数
exports.count = function (collectionName,callback) {
    _connectDB(function (err, db) {
     db.collection(collectionName).count({},function (err,result) {
        callback(err,result.toString());
         db.close();
     })
    })
}