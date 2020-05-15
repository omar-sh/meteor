import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const categories = new Mongo.Collection('Categories');
const metadata = new SimpleSchema({
    title: {type: String},
    required: {type: Boolean}
});
const Category = new SimpleSchema({
    title: {
        type: String
    },
    metadata: {
        type: Array,
    },
    'metadata.$': {
        type: metadata
    },
});


categories.attachSchema(Category);

export {categories}
