import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../store/actions/auth.actions'
import { authService } from '../services/auth.services'

const Login = (props) => {

    const onFinish = (values) => {
        console.log('Success:', values);
        const { username, password } = values;
        props.login(username, password);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Kullanıcı Adı"
                name="username"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Şifre"
                name="password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Giriş Yap
        </Button>
            </Form.Item>
        </Form>
    );
}

const mapStateToProps = (state) => {
    const { loggingIn, loggedIn } = state.authentication;
    return { loggingIn, loggedIn };
}

const mapDispatchToProps = {
    login: authActions.login,
    logout: authActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);