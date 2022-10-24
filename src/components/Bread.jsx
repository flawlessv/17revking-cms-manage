import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
const Bread = () => {
  const{pathname}=useLocation()
  const [breadName,setBreadName]=useState('查看文章列表')
  let key=pathname.split('/')[1]
  useEffect(()=>{
    let bread='';
    switch (key) {
      case 'list':
        bread='查看文章列表'
        break;
      case 'edit':
        bread='文章编辑'
        break;
      case 'means':
        bread='修改资料'
        break;
      default:
        key.includes('edit')?bread='文章编辑':bread=''
        break;
    }
    setBreadName(bread)
  },[pathname])
  return (<Breadcrumb>
    <Breadcrumb.Item href="/">
      <HomeOutlined />首页
    </Breadcrumb.Item>
    <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
  </Breadcrumb>)
}
export default Bread