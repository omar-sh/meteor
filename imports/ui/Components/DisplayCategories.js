import React from 'react';
import {Card, Col, Row, Space} from "antd";

const DisplayCategories = (props) => {

    return (
        <Row justify="center">

                {props.categories.map((item, index) => {
                    let i = 1;
                    return <Col key={index} flex={'auto'}>
                        <Card title={item.title} bordered={false}>
                            {item.metadataInputs.map((metaItem, index) => {
                                return (
                                    <div key={index}>{metaItem.title} : {metaItem.value}</div>
                                )
                            })}
                        </Card>

                    </Col>
                })}

        </Row>
    )


}

export default DisplayCategories;