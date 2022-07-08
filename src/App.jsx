import React from 'react'
import './assets/base.css'
import { Button } from 'antd';
import { Outlet } from 'react-router';
export default function App() {
  return (
    <div>
  <Button type="primary" ghost>
      Primary
    </Button>
<Outlet />
    </div>
  )
}
