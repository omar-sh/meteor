import React from 'react';
import {Button, Radio, Card, Input, Space, Select} from 'antd';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";


function handleChange(value) {
    this.props.handleChange()
    // console.log(`Value ${value.split(',')}`)
}

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


const Filter = (props) => {
    return (
        <Card>
            <Space direction={'vertical'} style={{width: '100%'}}>
                <Input placeholder={"Page"} style={{width: '100%'}}
                       onChange={(e) => props.onChange('page', e.target.value)}/>
                <Select
                    mode="multiple"
                    placeholder="Teams "
                    defaultValue={[]}
                    onChange={(value) => props.onChange('teams', value)}
                    style={{width: '100%'}}
                >
                    {props.teams.map(item => {
                        return <Option key={item._id}>{item.title}</Option>
                    })}
                </Select>
                <Select
                    mode="multiple"
                    placeholder="Categories"
                    defaultValue={[]}
                    onChange={(value) => props.onChange('selectedCategories', value)}
                    style={{width: '100%'}}
                >
                    {props.categories.map((item)=> {
                        return <Option key={item._id}>{item.title}</Option>
                    })}
                </Select>
                <Button type="primary"
                        onClick={props.onFilter}
                        block>
                    Filter
                </Button>
            </Space>
        </Card>
    )


};
export default (Filter);
