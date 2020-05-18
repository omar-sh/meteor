import React from 'react';
import {Input, Button, notification, Select, Form, Checkbox, Space, Card, Col, Row} from 'antd';
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {FlowRouter} from 'meteor/kadira:flow-router'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Metadata from '../Components/metadata';
import {FormInstance} from 'antd/lib/form';
import {notify} from "../../utils";

const {Option} = Select;
const {TextArea} = Input;


class EditPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            team: '',
            categories: [],
            isEdit: false,
            selectedCategories: [],
            metadataInputs: {},
            teams: []
        };
    }

    backendToFrontendMetadataStructure(categories) {
        const obj = {}
        for (let i = 0; i < categories.length; i++) {
            let metaObj = {};
            for (let j = 0; j < categories[i].metadataInputs.length; j++) {
                metaObj[categories[i].metadataInputs[j].title] = categories[i].metadataInputs[j].value
            }

            obj[categories[i].category] = metaObj
        }
        return obj;
    }


    componentWillReceiveProps(newProps) {


        console.log('componentWillReceiveProps', newProps);
        this.setState({
            categories: newProps.categories,
            teams: newProps.teams
        }, function () {

            if (newProps.pageId) {
                Meteor.call('page.display', newProps.pageId, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('DONE', res);
                        const obj = this.backendToFrontendMetadataStructure(res[0].categories);
                        this.setState({
                            selectedCategories: Object.keys(obj),
                            metadataInputs: obj,
                            team: res[0].team[0]._id,
                            title: res[0].title,
                            content: res[0].content,
                            isEdit: true
                        })

                        console.log(obj);

                    }
                });
            }

        })

    }


    onChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSelectChange = (name, value) => {
        this.setState({
            selectedCategories: value
        }, function () {
            // console.log('ASA', this.state)
        })

    }

    editPage = (e) => {
        Meteor.call('page/edit', {
            title: this.state.title,
            content: this.state.content,
            team: this.state.team,
            pageId: this.props.pageId,
            categories: this.reformatMetadataInputs()
        }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                notify('Page has been updated', `page with title "${this.state.title}" has been updated successfully`);
                FlowRouter.go(`/page/${this.props.pageId}`);
            }
        });
    }

    createPage = (e) => {
        const args = {
            message: 'New Page has been created',
            description: `page with title "${this.state.title}" has been created successfully`,
        };
        Meteor.call('page/new', {
            title: this.state.title,
            content: this.state.content,
            team: this.state.team,
            categories: this.reformatMetadataInputs()
        }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('DONE', res);
                notification['success'](args);
                FlowRouter.go(`/page/${res}`);
            }
        });
    }
    handleSelectChange = (name, value) => {
        const oldSelectedCategories = this.state.selectedCategories;
        this.setState({
            [name]: value
        }, function () {
            const shouldBeDelete = oldSelectedCategories.filter(item => !this.state.selectedCategories.includes(item));
            console.log("NEW SELECTED CATEGORY", this.state.selectedCategories);
            console.log("SHOULD BE DELETED", shouldBeDelete);
            shouldBeDelete.map(item => {

                this.setState({
                    metadataInputs: {
                        ...this.state.metadataInputs,
                        [item]: {}
                    }
                }, function () {
                    console.log('AFTER DELETE', this.state.metadataInputs);
                })
            })
        })
    };
    onSave = (e) => {
        console.log("LENGTH CATEGORES", this.state.selectedCategories.length);
        if (this.state.selectedCategories == 0) {
            return;
        }
        if (this.state.isEdit)
            this.editPage(e);
        else
            this.createPage(e);
    };

    onMetaDataChange = (categoryId, title, value) => {
        const metadataInputs = this.state.metadataInputs;
        const categoryValues = metadataInputs[categoryId];
        console.table({categoryId, title, value});
        this.setState({
            metadataInputs: {
                ...metadataInputs,
                [categoryId]: {
                    ...categoryValues,
                    [title]: value
                }
            }
        }, function () {
            console.log('INPUTS', this.state.metadataInputs)
        })

    };

    reformatMetadataInputs = () => {
        let submittedCategories = [];
        for (let categoryId in this.state.metadataInputs) {
            if (Object.keys(this.state.metadataInputs[categoryId]).length === 0)
                continue;

            let obj = {
                category: categoryId,
                metadataInputs: []
            }
            for (let metadataTitle in  this.state.metadataInputs[categoryId]) {

                obj.metadataInputs.push({
                    title: metadataTitle,
                    value: this.state.metadataInputs[categoryId][metadataTitle]
                })
            }
            submittedCategories.push(obj);
        }
        return submittedCategories;
    }


    render() {
        console.log('THIS', this)
        const selectedCategories = this.state.categories.filter(item => {
            return this.state.selectedCategories.includes(item._id)
        })
        console.log('SLECTED  CATEGORIES', this.state.selectedCategories);
        const tailLayout = {
            wrapperCol: {offset: 2, span: 16},
        };
        const layout = {
            labelCol: {span: 2},
            wrapperCol: {span: 16},
        };
        return (
            <>
                <Form
                    {...layout}
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={this.onSave}
                    fields={[{"name": ["title"], "value": this.state.title}, {
                        "name": ["content"],
                        "value": this.state.content
                    }, {"name": ["team"], "value": this.state.team}]}
                    onFieldsChange={(changeFields, allFields) => {
                        const changedField = changeFields[0];
                        if (!changedField)
                            return;


                        if (changedField) {
                            this.setState({
                                [changedField.name[0]]: changedField.value
                            })
                            console.log("SADDAD", changedField.name[0])
                        }
                        // console.log('change', changeFields, allFields);
                    }}
                >

                    <Form.Item
                        label="title "
                        name="title"
                        rules={[{required: true, message: 'Title should not be empty'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="content "
                        name="content"
                        rules={[{required: true, message: 'Content should not be empty'}]}
                    >
                        <ReactQuill theme="snow"/>

                    </Form.Item>
                    <Form.Item
                        label="category"
                        rules={[{required: true, message: 'Categories should not be empty'}]}
                    >

                        <Select
                            mode="multiple"
                            name="selectedCategories"
                            placeholder="Please select"
                            style={{width: '100%'}}

                            onChange={(value) => this.handleSelectChange('selectedCategories', value)}

                        >
                            {this.state.categories.map(item => {
                                return <Option key={item._id}>{item.title}</Option>
                            })}
                        </Select>
                        {this.state.selectedCategories.length === 0 &&
                        <p style={{color: 'red'}}>categories should not be empty</p>
                        }
                    </Form.Item>


                    <Form.Item
                        label="team"
                        name="team"
                        rules={[{required: true, message: 'Team should not be empty'}]}
                    >
                        <Select name="team"
                                value={this.state.team}>
                            {this.state.teams.map(item => {
                                return <Option key={item._id} value={item._id}>{item.title}</Option>

                            })}

                        </Select>
                    </Form.Item>

                    <Metadata categories={selectedCategories} metadataInputs={this.state.metadataInputs}
                              onChange={this.onMetaDataChange}/>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )

    }


}


export default withTracker((props) => {
    Meteor.subscribe('teams');
    Meteor.subscribe('categories');
    let page = null;
    if (props.pageId) {
        return {
            pageId: props.pageId,
            teams: db.teams.find({}).fetch(),
            categories: db.categories.find({}).fetch()
        }
    } else {
        return {
            teams: db.teams.find({}).fetch(),
            categories: db.categories.find({}).fetch()
        }
    }


})(EditPage);