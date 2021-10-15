import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const {  Sider } = Layout;

const NavMenu = () => {

    return (<Sider width={200} className="site-layout-background">
        <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
        >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1"> <Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"> <Link to="/about">About</Link></Menu.Item>
                <Menu.Item key="3"> <Link to="/login">Login</Link></Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>);
};

export default NavMenu;

