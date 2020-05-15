import { Meteor } from 'meteor/meteor'

Meteor.publish({
    'teams': () => {
        return db.teams.find({});
    }
})
