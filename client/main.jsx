import React from 'react';
import { Meteor } from 'meteor/meteor';
import '/imports/api/__methods'

import '/client/routes/__init'

import { db as _db } from '/imports/api/__db'

db = _db
Meteor.startup(() => {
    // console.log
  // render(<App/>, document.getElementById('react-target'));
});
