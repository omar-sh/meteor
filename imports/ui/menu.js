import React from 'react';
import {Menu, notification, Button} from 'antd';
import {FlowRouter} from 'meteor/kadira:flow-router'
import Filter from '../ui/Components/Filter'
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";


const goToPage = (pageId) => {
    FlowRouter.go(`/page/${pageId}`)
}

class MenuComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: '',
            teams: [],
            category: [],
            allTeams: [],
            pages: [],
            categories:[],
            selectedCategories:[]
        }
    }


    handleChange = (name, value) => {

        this.setState({
            [name]: value
        }, function () {
            console.log('STAET', this.state)
        })
    }

    componentWillReceiveProps(newProps) {
        console.log('NEW PROPS',  newProps)
        this.setState({
            allTeams: newProps.teams,
            pages: newProps.pages,
            categories: newProps.categories
        })
    }

    onFilter = () => {
        Meteor.call('page.filter', {title: this.state.page, teams: this.state.teams, categories:this.state.selectedCategories}, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res)
                    this.setState({
                        pages: res
                    })
            }
        });

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)'}}>
                <Filter
                    teams={this.state.allTeams}
                    categories={this.state.categories}
                    onChange={this.handleChange}
                    onFilter={this.onFilter}
                />
                <Menu style={{overflowY: 'auto', height: '100%'}} mode="inline" defaultSelectedKeys={['4']}>
                    {this.state.pages.map(item => {
                        return <Menu.Item key={item._id} onClick={(e) => goToPage(item._id)}>
                            {item.title}
                        </Menu.Item>

                    })}
                    <Menu.Item key="new_page">
                        <Button type="link" onClick={() => FlowRouter.go('/page/new')}>Create new page</Button>
                    </Menu.Item>


                </Menu>
            </div>
        )
    }
};

export default withTracker((props) => {
    Meteor.subscribe('pages');
    Meteor.subscribe('teams');
    Meteor.subscribe('categories');
    return {
        pages: db.pages.find({}).fetch(),
        teams: db.teams.find({}).fetch(),
        categories: db.categories.find({}).fetch(),

    }

})(MenuComp);

