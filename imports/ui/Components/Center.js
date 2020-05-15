import React from 'react';
import {Row} from 'antd';

const Center = (props) => {

    return (

        <Row justify="center" style={{height: '100%', alignItems:'center'}}>
            {props.children}
        </Row>


    )


}

export default Center;