var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Todolist Model
 * =============
 */

var Todolist = new keystone.List('Todolist', {
	map: { name: 'title' },
    autokey: { from: 'title', path: 'key', unique: true}
});

Todolist.add({
    title: { type: String, required: true },
    completed: { type: Boolean, label: 'is completed' },
    date_completed: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

Todolist.defaultSort = '-created';
Todolist.defaultColumns = 'title, completed, created';
Todolist.register();
