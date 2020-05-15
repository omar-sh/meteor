import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const pages = new Mongo.Collection('Pages');

const metadataSchema = new SimpleSchema({
    title: {
        type: String,
    },
    value: {
        type: String
    }
})

const categorySchema = new SimpleSchema({
    category: {type: String},
    metadataInputs: {type: Array},
    'metadataInputs.$': {type: metadataSchema}
});
const Page = new SimpleSchema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    team: {
        type: String
    },
    categories: {
        type: Array
    },
    'categories.$': {
        type: categorySchema
    }

});

if (Meteor.isServer) {
    pages.rawCollection().createIndex({title: 'text', content: 'text'});
}

pages.attachSchema(Page);

export {pages, Page}
