import React from 'react'

import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import App  from '/imports/ui/app'

import './page'

FlowRouter.notFound = {
	name: 'page/not-found',
	action: (params, queryParams) => {
		mount(App, {
			content: <h1>Not Found</h1>
		});
	}
};

