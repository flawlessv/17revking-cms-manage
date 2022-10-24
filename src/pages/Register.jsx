import React from 'react'
import { Button, Form, Input ,message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './less/login.less'
import logo from'../assets/logo.png'
import { Link  ,useNavigate} from 'react-router-dom';
import { RegisterApi } from '../request/api';
export default function Register() {
  const navigate=useNavigate()
    const onFinish = (values) => {
      RegisterApi({
        username:values.username,
        password:values.password
      }).then(res=>{
        console.log(res);
        if(res.errCode===0){
message.success(res.message)
setTimeout(()=>navigate('/login'),1500)
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
        <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="请再次确认密码" prefix={<LockOutlined className="site-form-item-icon" />} />
      </Form.Item>
  {/* 注册 */}
        <Form.Item
          name="register"
        >
        <Link to="/login">已有帐号，立即登录</Link>
        </Form.Item>
        <Form.Item
        >
          <Button size="large" block type="primary" htmlType="submit">
            立即注册
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
    );
  
}
