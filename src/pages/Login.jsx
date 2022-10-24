import React from 'react'
import { Button, Form, Input,message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './less/login.less'
import logo from'../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom';
import {LoginApi} from '../request/api'
export default function Login() {
const navigate=useNavigate()
    const onFinish = (values) => {
      console.log('Success:', values);
      LoginApi({
        username:values.username,
        password:values.password
      }).then(res=>{
  if(res.errCode===0){
    localStorage.setItem('avatar',res.data.avatar)
    localStorage.setItem('cms-token',res.data['cms-token'])
    localStorage.setItem('editable',res.data.editable)
    localStorage.setItem('player',res.data.player)
    localStorage.setItem('username',res.data.username)
    message.success(res.message)
   setTimeout(() => {
    navigate('/')
   }, 1500);
  }else{
    message.error(res.message)
  }
      })
    };

  
    return (
    <div className="login">
      <div className="login_box">
        <img src={logo} alt="logo" />
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}

        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" />}/>
        </Form.Item>
  
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined className="site-form-item-icon" />}/>
        </Form.Item>
  {/* 注册 */}
        <Form.Item
          name="register"
        >
        <Link to="/register">还没账号？立即注册</Link>
        </Form.Item>
        <Form.Item
        >
          <Button size="large" block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
    );
  
}
