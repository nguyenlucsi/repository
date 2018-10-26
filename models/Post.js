var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.test = function(arrArticle) {
	//
	var arrId = arrArticle || 0;
	return arrId;
};

/**
 * get details
 */
Post.getDetails = function(arrArticle, cb) {
	// set params
	var arrId = arrArticle || 0;
	if (arrId === 0) return cb(0);
	Post.model.find({ '_id' : { $in: arrId }}).exec().then(function (result) {
		return cb(result);
	});
};

/**
 * get basic
 * do not get content
 */
Post.getBasic = function(arrArticle, cb) {
	// set params
	var arrId = arrArticle || 0;
	if (arrId === 0) return cb(0);
	var select = { '_id': 1, 'slug': 1, 'title': 1, 'categories': 1 };
	var where = { '_id' : { $in: arrId }};
	Post.model.find(where, select).exec().then(function (result) {
		return cb(result);
	});
};

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
