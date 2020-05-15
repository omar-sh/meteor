import {Meteor} from 'meteor/meteor'
import {check} from 'meteor/check';


if (Meteor.isServer) {
    console.log('I am INSIDE SERVER RIGHT NOW');
    Meteor.methods({
        'page.filter': async (page) => {
            const matchObject = {};
            if (page.teams.length > 0)
                matchObject['team'] = {
                    $in: page.teams
                };
            if (page.title) {
                matchObject['$text'] = {
                    $search: page.title
                }
            }
            if (page.categories.length > 0) {
                matchObject['categories.category'] = {
                    $in: page.categories
                };
                console.log('page.categories', page.categories);
            }
            return await db.pages.aggregate([{
                $match: matchObject
            }]);

        },
        'page.display': (pageId) => {
            return db.pages.aggregate([
                {
                    $match: {
                        _id: pageId
                    }
                },
                {
                    $lookup: {
                        localField: 'categories.category',
                        foreignField: '_id',
                        from: 'Categories',
                        as: 'categoriesTitles'
                    }
                },
                {
                    $lookup: {
                        localField: 'team',
                        foreignField: '_id',
                        from: 'Teams',
                        as: 'team'
                    }
                },
                {
                    $project: {
                        categoriesTitles: 1,
                        title: 1,
                        content: 1,
                        team: 1,
                        categories: {
                            $map: {
                                input: '$categories',
                                as: 'ct',
                                in: {
                                    $mergeObjects: [
                                        '$$ct',
                                        {
                                            $arrayElemAt: [{
                                                $filter: {
                                                    input: '$categoriesTitles',
                                                    cond: {$eq: ['$$this._id', '$$ct.category']}
                                                },
                                            }, 0]
                                        }

                                    ]
                                }

                            }
                        }
                    }
                }
            ])
        },
    })

}


Meteor.methods({
    'page/new': (page) => {
        console.log('ADDED', page)
        check(page, Object);
        check(page.title, String);
        check(page.content, String);
        check(page.team, String);
        return db.pages.insert(page);
    },


    'page/delete': async (pageId) => {
        return db.pages.remove({_id: pageId})
    },
    'page/edit': async (page) => {
        check(page, Object);
        check(page.title, String);
        check(page.content, String);
        check(page.team, String);
        return db.pages.update(page.pageId, {
            $set: {
                title: page.title,
                content: page.content,
                team: page.team,
                categories: page.categories
            }
        });
    },


});
