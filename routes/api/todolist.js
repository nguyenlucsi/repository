var keystone = require('keystone');

var Todolist = keystone.list('Todolist');

exports.list = function (req, res) {
    Todolist.model.find(function (err, items) {
        //
        if (err) return res.json({ err: err });
        res.json({
            list: items
        });
    });
};

// get by id
exports.get = function (req, res) {
    //
    var id = req.params.id;
    Todolist.model.findById(id).exec(function (err, item) {
        //
        if (err) return res.json({ id: id });

        //
        if (!item) return res.json('eo thay gi');

        //
        res.json({
            todo: item
        });
    });
};

/**
 * post new todo
 */
exports.create = function (req, res) {
    //
    var item = Todolist.model();
    var data = (req.method == 'POST') ? req.body : req.query;
    item.getUpdateHandler(req).process(data, function (err) {
        //
        if (err) return res.json({ error: err });
        res.json({
            todo: item
        });
    });
};

/**
 * update todo
 */
exports.update = function (req, res) {
    //
    var where = { "_id": req.params.id };
    Todolist.model.findOne(where).exec(function (err, item) {
        //
        if (err) return res.json({ error: err });
        if (!item) return  res.json({ error: 'not found' });
        var data = (req.method == 'PUT') ? req.body : req.query;
        item.getUpdateHandler(req).process(data, function (err) {
            //
            if (err) return res.json({ error: err });
            res.json({
                todolist: item
            });
        });
    });
};