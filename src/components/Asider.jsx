import React, { useEffect, useState } from 'react'
import { ReadOutlined, EditOutlined, HeartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';
export default function Asider() {
    const {pathname}=useLocation()
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
    const items = [
        getItem('查看文章列表list', 'listlist', <ReadOutlined />),
        getItem('查看文章列表table', 'listtable', <ReadOutlined />),
        getItem('文章编辑', 'edit', <EditOutlined />),
        getItem('修改资料', 'means', <HeartOutlined />),
      ];
      const[defaultKey,setDefaultKey]=useState()
      const navigate=useNavigate()
      let key=pathname.split('/')[1]
      //当pathname改变时
      useEffect(()=>{
          setDefaultKey(key)
      },[pathname])
      const onClick = (e) => {
        navigate('/'+e.key)
        setDefaultKey(e.key)
      };
      return (
        <Menu
          onClick={onClick}
          style={{
            width: 200,
          }}
          selectedKeys={[defaultKey]}
          mode="inline"
          items={items}
          theme='dark'
          className='sider'
        />
      );
}
