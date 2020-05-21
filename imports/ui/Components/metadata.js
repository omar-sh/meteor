import React from 'react';
import {Card, Col, Row, Input, Space} from "antd";
import {Form} from 'antd';


const renderCards = (categories, metadataInputs, onChange) => {
    let i = 1;
     return categories.map(item => {

        return (<div key={i++}><Row key={i++} gutter={24}>
                <Col span={24}>
                    <Card title={item.title} bordered={false}>
                        <Space direction={'column'}>
                            {item.metadata.map(metaItem => {
                                /**
                                 *  x= { categoryId: {
                                 *      "Tool" :"Hi"
                                 *  }}
                                 *
                                 *  x[categoryId][tool]
                                 */
                                return <Input
                                    value={metadataInputs[item._id] ?  metadataInputs[item._id][metaItem.title]   : ''}
                                    placeholder={metaItem.title}
                                    style={{width: '100%'}}
                                    key={i++}
                                    onChange={(e) => onChange(item._id, metaItem.title, e.target.value)}
                                    required={metaItem.required}
                                />
                            })}
                        </Space>
                    </Card>
                </Col>


            </Row>
                <br/>
                <br/>
            </div>
        );


    })


}

const Metadata = (props) => {
    return renderCards(props.categories, props.metadataInputs, props.onChange)

};


export default Metadata;