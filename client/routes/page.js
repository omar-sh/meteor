import React from 'react'

import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import App  from '/imports/ui/app'
import EditPage from '../../imports/ui/page/EditPage'
import DisplayPage from '../../imports/ui/page/DisplayPage'

FlowRouter.route('/', {
	name: 'page/landing',
	action: (params, queryParams) => {
		mount(App, {
			content:<h1>landing</h1>
		});
	}
});

FlowRouter.route('/page/new', {
	name: 'page/new',
	action: (params, queryParams) => {
		mount(App, {
            content:<EditPage/>

        });
	}
});

FlowRouter.route('/page/edit/:pageId', {
    name: 'page/edit',
    action: (params, queryParams) => {
        mount(App, {
            content:<EditPage pageId={params.pageId}/>
        });
    }
});

FlowRouter.route('/page/:pageId', {
	name: 'page/display',
	action: (params, queryParams) => {
		mount(App, {
            content:<DisplayPage pageId={params.pageId}/>
        });
	}
});


// meteor-node-stubs