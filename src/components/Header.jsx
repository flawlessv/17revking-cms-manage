import React,{useEffect, useState} from 'react'
import logo from '../assets/logo.png'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space } from 'antd';
import {useNavigate} from 'react-router-dom';
import defaultAvatar from'../assets/defaultAvatar.webp'

export default function Header() {
    const [Avatar,setAvatar]=useState(defaultAvatar)
    const [username,setUserName]=useState('游客')
    const navigate=useNavigate()
    // 模拟生命周期
   useEffect(()=>{
const username1=localStorage.getItem('username')
const avatar1=localStorage.getItem('avatar')
if(username1){
  setUserName(username1)
}
if(avatar1){
  // console.log(avatar1);
  setAvatar('http://47.93.114.103:6688/'+avatar1)
}
   },[localStorage.getItem('avatar')])
  //  退出登录
   function logout(){
    localStorage.clear()//清除localStorage中的数据
message.success('退出成功!')
setTimeout(() => navigate('/login'),1500);
  }
  const menu = (
    <Menu
      items={[
        {
          label: (
            <span >
             修改资料
            </span>
          ),
          key: '0',
        },
        {
            type: 'divider',
          },
        {
          label: (
            <span onClick={logout}>
              退出登录
            </span>
          ),
          key: '1',
        },
      ]}
    />
  );
  return (
    <header>
    <img src={logo} alt="logo" className="logo" />
    <div className="right">
    <Dropdown overlay={menu}>
    <a onClick={(e) => e.preventDefault()} className="down">
      <Space>
          <img src={Avatar} alt="Avatar" className='Avatar'/>
        <span>{username}</span>
        <CaretDownOutlined />
      </Space>
    </a>
  </Dropdown>
    </div>
  </header>
  )
}
