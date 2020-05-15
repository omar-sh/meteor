import React from 'react'
import {Layout, Menu} from 'antd';
import {withTracker} from 'meteor/react-meteor-data';
import 'antd/dist/antd.css';

const {SubMenu} = Menu;
import MenuComp from './menu';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
import {Breadcrumb} from 'antd';

// import { Menu } from './menu'

class App extends React.Component {
    render() {
        console.log('sdasd')
        return (
            <Layout style={{height: '100vh'}}>
                <Header className="header">
                    <div className="logo"/>
                </Header>
                <Layout>
                    <Sider width={276} className="site-layout-background">
                        <MenuComp/>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>

                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.content}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default  (App);
