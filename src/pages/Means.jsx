import React,{useEffect,useState} from 'react'
import { Button, Form, Input, message,Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {getUserDataApi,changeUserDataApi} from '../request/api'
import './less/Means.less'
export default function Means() {
  //获取用户信息
useEffect(()=>{
  getUserDataApi().then((res)=>{
if(res.errCode===0){
  // sessionStorage.setItem('username',res.data.username)
}
  })
},[])
//提交表单函数
const onFinish=(values)=>{
if(values.username&&values.username!==sessionStorage.getItem('username')&&values.password.trim()!==''){
  changeUserDataApi({
    username:values.username,
    password:values.password
  }).then((res)=>{
    console.log(res);
    if(res.errCode===0){
      message.success(res.message)
    }else{
      message.error(res.message)
    }
  })
}
}
//上传头像函数
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024/1024 < 200;

  if (!isLt2M) {
    message.error('Image must smaller than 200KB!');
  }

  return isJpgOrPng && isLt2M;
};
const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem('avatar',info.file.response.data.filePath)
        // console.log('Meas'+info.file.response.data.filePath);
        // console.log(localStorage.getItem('avatar'));
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
       上传
      </div>
    </div>
  );
  return (
    <div className="means">
      <Form
      name="basic"
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 4,
      }}
      initialValues={{
      // username:username1,
      // password:password1
      }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="修改用户名"
        name="username"     
      >
        <Input placeholder='请输入新用户名' />
      </Form.Item>
      <Form.Item
        label="修 改 密 码"
        name="password"
      >
        <Input.Password placeholder='请输入新密码'/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
        }}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    
    <p>点击下方修改头像：</p>
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      headers={{'cms-token':localStorage.getItem('cms-token')}}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    </div>
  )
}
