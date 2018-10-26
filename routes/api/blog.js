var keystone = require('keystone');

var Post = keystone.list('Post');
var PostCategory = keystone.list('PostCategory');

exports.list = function (req, res) {
    console.debug('test' + req.query.test);
    
    Post.model.find(function (err, items) {
        //
        if (err) return res.json({ err: err });
        res.json({
            list: items
        });
    });
};

// show all list category
exports.getById = function (req, res) {
    // var arrArticles = ['5bcfdcb07d38ab06ca3eaaaa', '5bcfdd4d7d38ab06ca3eaaab'];
    var listArticles = req.params.arrid;
    var arrArticles = listArticles.split(',') || 0;
    
    Post.getBasic(arrArticles, function (cb) {
        //
        getData(cb, res);
    });
};

/**
 * get return data
 */
getData = function (data, res) {
    //
    res.json({
        list: data
    });
};

// show post by category
exports.get_by_cate = function (req, res) {
    //
    var key = req.params.key;
    var cateId;
    PostCategory.model.findOne({ key: key }).exec(function (err, cateDetails) {
        //
        if (err) return res.json({ err: err });
        cateId = cateDetails;
        Post.model.find({ categories: cateId }, { _id: 1}).exec(function (errPost, resPosts) {
            // 
            var arrPostId = [];
            for (var key in resPosts) {
                //
                arrPostId.push(resPosts[key]._id);
            }
            //
            console.debug('arrPostId ' + arrPostId);
            
            if (errPost) return res.json({ err: errPost });
            res.json({
                list: resPosts
            });
        });
    });
};

// get by id
exports.get = function (req, res) {
    //
    var id = req.params.id;
    Post.model.findById(id).exec(function (err, item) {
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
 * create post blog
 */
exports.create = function (req, res) {
    //
    var item = Post.model();
    var data = (req.method == 'POST') ? req.body : req.query;
    item.getUpdateHandler(req).process(data, function (err) {
        //
        if (err) return res.json({ error: err });
        res.json({
            blog: item
        });
    });
};

/**
 * create update blog
 */
exports.update = function (req, res) {
    //
    var where = { "_id": req.params.id };
    Post.model.findOne(where).exec(function (err, item) {
        //
        if (err) return res.json({ error: err });
        if (!item) return res.json({ err: 'not found' });
        var data = (req.method == 'PUT') ? req.body : req.query;
        item.getUpdateHandler(req).process(data, function (err) {
            //
            if (err) return res.json({ error: err });
            res.json({
                blog: item
            });
        });

    });
    

};