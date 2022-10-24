import React, { useEffect, useState } from 'react'
import { Space, Table, Button,message } from 'antd';
import moment from 'moment';
import { getArticleApi,DeleteArticleApi } from '../request/api';
import { useNavigate } from 'react-router-dom';
import './less/listtable.less'
function MyTitle(props) {
  return <div>
    <a href={"http://47.93.114.103:6688/manage/article/" + props.id} className='table_title'>{props.title}</a>
    <p style={{ color: '#999' }}>{props.subTitle}</p>
  </div>
}
export default function Listtable() {
  const navigate=useNavigate()
  const columns = [
    {
      dataIndex: 'myTitle',
      key: 'myTitle',
      width: '65%',
      render: text => <div>{text}</div>
    },
    {
      dataIndex: 'date',
      key: 'date',
    },
  
    {
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type="primary" onClick={() => { navigate('/edit' + '/' + text.key) }}>编辑</Button>
          <Button type="danger" onClick={() => delFn(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];
  //提取代码
  function getArticleList(current, pageSize) {
    getArticleApi({
      num: current,
      count: pageSize
    }).then((res) => {
      if (res.errCode === 0) {
        //更改pagination
        // console.log(res.data);
        let { num, count, total } = res.data;
        setPagination({
          current: num,
          pageSize: count,
          total
        })

        //深拷贝
        let newArr = JSON.parse(JSON.stringify(res.data.arr));
        let myArr = []
        // newArr.map(item=>{
        //   item.key=item.id
        //   item.date=moment(item.date).format("YYYY-MM-DD hh:mm:ss")
        //   item.myTitle=`<div>
        //   <Link to='/' className='table_title'>${item.title}</Link>
        //   <p style={{color:'#999'}}>${item.subTitle}</p>
        //   <div/>`
        // }
        //   )
        // setArr(newArr)
        newArr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            myTitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }
          myArr.push(obj)
        })
        setArr(myArr)
      }

    })
  }
  const delFn = (id) => {
    DeleteArticleApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
        getArticleList(1, pagination.pageSize)
      } else {
        message.error(res.error)
      }
    })
  }
  // 列表数据
  const [arr, setArr] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }
  ])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })
  // 获取数据
  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize)
  }, [])
  const pageChange = (arg) => {
    getArticleList(arg.current, arg.pageSize)
  }
  return (
    <div className="list_table">
      <Table showHeader={false} columns={columns} dataSource={arr} pagination={pagination} onChange={pageChange} />
    </div>
  )
}

