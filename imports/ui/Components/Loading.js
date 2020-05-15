import React from 'react';
import Center from './Center';
import {Space, Spin} from "antd";


const Loading = () => {

    return (
        <Center>
            <Spin size="large"/>
        </Center>
    )


}

export default Loading;