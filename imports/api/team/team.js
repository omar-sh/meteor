import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const teams = new Mongo.Collection('Teams')

const Team = new SimpleSchema({
    title: {
        type: String
    },
    description: {
        type: String
    }

});

teams.attachSchema(Team);

export {teams}
