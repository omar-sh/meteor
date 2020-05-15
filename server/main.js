import { Meteor } from 'meteor/meteor'
import '/imports/api/__methods'
import '/imports/api/__publications'

import { db as _db } from '/imports/api/__db'

import { setupTeams ,setupCategories} from '/server/api/__init'
import {notification} from "antd";

db = _db;
console.log(db);
Meteor.startup(() => {

    setupTeams();
    setupCategories();
});
