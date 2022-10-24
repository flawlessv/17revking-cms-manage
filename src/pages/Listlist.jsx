import React, { useEffect, useState } from 'react';
import { List, Skeleton, Pagination, Button, message } from 'antd';
import { getArticleApi, DeleteArticleApi } from '../request/api'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
export default function Listlist() {
  const [list, setList] = useState([]);
  const [updateDate, setUpdateDate] = useState(0);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate()
  // 抽离获取数据部分
  const getArticleApiData = (num) => {
    getArticleApi({
      num,
      count: pageSize
    }).then((res) => {
      if (res.errCode === 0) {
        const { total, num, count } = res.data
        setList(res.data.arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }
 
  const delFn = (id) => {
    DeleteArticleApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
        setUpdateDate(updateDate+1)
      } else {
        message.error(res.error)
      }
    })
  }
  // componentDidMounted
  useEffect(() => {
    getArticleApiData()
  }, [])
  // componentUpdated
  useEffect(() => {
    getArticleApiData()
  }, [updateDate])
  const onChange = (pages) => {
    getArticleApiData(pages)
  }
  return (
    <div className="list_table">
      <List style={{ padding: '20px' }}
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type='primary' onClick={() => { navigate('/edit' + '/' + item.id) }}>编辑</Button>,
              <Button type='danger' onClick={() => delFn(item.id)}>删除</Button>]}
          >
            <Skeleton loading={false} active>
              <List.Item.Meta

                title={<a href="#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh-mm-ss")}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination defaultCurrent={1} total={total} current={current} pageSize={pageSize} onChange={onChange} />
    </div>
  )
}
