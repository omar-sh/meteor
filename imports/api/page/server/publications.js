import {Meteor} from 'meteor/meteor'


Meteor.publish({
    'pages': () => {
        return db.pages.find({}, {
            fields: {
                _id: true,
                title: true,
                team: true,
                content: true,

            }
        });
    },

    'page': (pageId) => {
        return db.pages.find({
            _id: pageId
        });
    },


});

