import React from "react";
import {Meteor} from "meteor/meteor";
import {Modal, notification} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

const confirmPopUp = (title, content, cb) => {

    confirm({
        icon: <ExclamationCircleOutlined/>,
        title,
        content,
        onOk: () => {
            return cb();
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const notify = (message, description) => {
    const args = {
        message,
        description,
    };
    notification['success'](args);
};



export {
    confirmPopUp,
    notify
}
