function setupTeams() {
    if (db.teams.find().count() === 0) {
        [{
            title: 'All',
            description: 'Everything concerning everyone'
        }, {
            title: 'Sales',
            description: 'Concerning our sellers'
        }, {
            title: 'IT',
            description: 'Development and infrastructure'
        }].forEach((team) => {
            db.teams.insert(team);
        });
    }
}


function setupCategories() {
    if (db.categories.find().count() === 0) {
        [{
            title: 'Tool',
            metadata: [{title: 'Target group', required: true}, {
                title: 'Usecase',
                required: true
            }, {title: 'Contact person', required: true}, {title: 'Link', required: false}]
        }, {
            title: 'Process',
            metadata: [{title: 'Target group', required: true}, {
                title: 'Usecase',
                required: true
            }, {title: 'Contact person', required: true}]

        }, {
            title: 'Template',
            metadata: [{title: 'Target group', required: true}, {
                title: 'Usecase',
                required: true
            }, {title: 'Contact person', required: true}]

        },
            {
                title: 'Resource',
                metadata: [{title: 'Target group', required: true}, {title: 'Usecase', required: true}, {title: 'Contact person', required: true}]
            }].forEach((team) => {
            db.categories.insert(team);
        })
    }

}



export {setupTeams,setupCategories}
