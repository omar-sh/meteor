import React from 'react';
import {Empty} from 'antd';
import Center from "./Center";

const EmptyComp = (props) => {

    return (
        <Center>
            <Empty
                description={
                    props.description
                }
            >
                {props.children}
            </Empty>
        </Center>
    )
};

export default EmptyComp;
