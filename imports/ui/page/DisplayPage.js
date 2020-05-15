import {Meteor} from 'meteor/meteor'

import React from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {Spin, Space, Row, Col, Card, Button, notification} from 'antd';
import Loading from '../Components/Loading';
import EmptyComp from '../Components/Empty';
import {FlowRouter} from 'meteor/kadira:flow-router'
import DisplayCategories from '../Components/DisplayCategories'
import {confirmPopUp, notify} from "../../utils";

class DisplayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notFound: false,
            page: {}
        }
    }

    renderPage() {

        return (
            <div className="site-card-wrapper">
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Card title={this.state.page.title}
                              extra={<Space><Button onClick={() => FlowRouter.go(`/page/edit/${this.props.pageId}`)}
                                                    type="primary"> Edit </Button> <Button
                                  onClick={() => this.deletePage()} type="danger"> Delete </Button></Space>}
                              bordered={false}>
                            <div dangerouslySetInnerHTML={{__html: this.state.page.content}}/>
                            <br/>
                            <div> Team : {this.state.page.team[0].title}</div>
                        </Card>
                        <br/>
                        categories:
                        <DisplayCategories categories={this.state.page.categories}/>
                    </Col>
                </Row>
            </div>


        )
    }

    deletePage = () => {
        confirmPopUp('Do you Want to delete these items?', `Do you want to delete page with title ${this.state.page.title}?`, () => {
            Meteor.call('page/delete', this.props.pageId, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('DONE', res);
                    FlowRouter.go('/');
                    notify('Page has been deleted', `page with title "${this.state.page.title}" has been deleted successfully`)
                }
            });
        });
    }

    componentWillReceiveProps(newProps) {
        Meteor.call('page.display', newProps.pageId, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('DONE', res);
                if (res.length === 0)
                    this.setState({
                        notFound: true
                    })
                else
                    this.setState({
                        page: res[0],
                        loading: false
                    }, function () {
                        console.log("SOREOER", this.state)
                    })

                this.setState({
                    loading: false
                })
            }
        });
    }

    render() {

        if (this.state.notFound)
            return (<EmptyComp description={"Page not found"}>
                    <Button onClick={() => FlowRouter.go('/page/new')} type="primary">Create new page</Button>
                </EmptyComp>
            )

        if (this.state.loading)
            return <Loading/>;


        return (
            <>
                {this.renderPage()}
            </>
        )

    }

}


export default withTracker((props) => {
    console.log("COMPONENT WILL MOUNT")
})(DisplayPage)