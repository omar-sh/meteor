import { Meteor } from 'meteor/meteor'

Meteor.publish({
    'categories': () => {
        return db.categories.find({});
    }
})
