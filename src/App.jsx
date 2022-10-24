import React from 'react'
import { Layout } from 'antd';
import './assets/base.less'
import { Outlet } from 'react-router';
import Asider from './components/Asider';
import Header from './components/Header';
import Bread from './components/Bread'
export default function App() {

  return (
    <Layout id='app'>
 <Header />
    <Layout className='layout'>
   <Asider /> 
<div className='content'> 
<Bread />
<Outlet />
</div>
    </Layout>
    <footer>Respect | Copyright &copy; 2022 Author 秋一漫漫</footer>
  </Layout>
  )
}
