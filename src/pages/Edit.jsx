import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Button, PageHeader, Modal, Form, Input, message } from 'antd';
import { addArticleApi, ArticleLookApi, ArticleUpdateApi } from '../request/api';
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import moment from 'moment';
export default function Edit() {
  const params = useParams()
  const [editor, setEditor] = useState(null)
  const [title, setTitle] = useState()
  const [subTitle, setSubTitle] = useState()
  const location = useLocation()
  const navigate=useNavigate()
  // 编辑器内容
  const [html, setHtml] = useState('')
  //自定义表单hook
  const [form] = Form.useForm();
  // 工具栏配置
  const toolbarConfig = {}
  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...',
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  //模态框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Received values of form: ', values);
        const { title, subTitle } = values
        form.resetFields();
        if (params.id) {
          //修改文章
          ArticleUpdateApi({
            title, subTitle,
            content: html,
            id: params.id
          }).then((res) => {
            console.log(res);
            if (res.errCode === 0) {
              message.success(res.message)
              navigate('/listlist')
            } else {
              message.error(res.message)
            }
          })
        } else {
          // 添加文章
          addArticleApi({
            title, subTitle,
            content: html
          }).then((res) => {
            console.log(res);
            if (res.errCode === 0) {
              message.success(res.message)
              navigate('/listlist')
            } else {
              message.error(res.message)
            }
          })
        }
        setIsModalVisible(false)
      })
      .catch(() => {
        return
      });
  }    
  // 查看文章
  useEffect(() => {
    if (params.id) {
      ArticleLookApi({ id: params.id }).then((res) => {
        const { title, subTitle, content } = res.data
        setHtml(content)
        setTitle(title)
        setSubTitle(subTitle)
      })
    }else{
      setHtml(' ')
    }
  }, [location.pathname])

  // useEffect(() => {
  // }, [])
  //表单处理函数
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      {/* 表头 */}
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={params.id ? () => window.history.back() : null}
          title="文章编辑"
          subTitle={"当前日期" + moment(new Date()).format("YYYY-MM-DD")}
          extra={
            <Button type="primary" onClick={() => setIsModalVisible(true)}>提交文章</Button>
          }
        >
        </PageHeader>
        {/* 模态框 */}
        <Modal title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="提交"
          cancelText="取消">
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 3,
            }}
            wrapperCol={{
              span: 21,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{ title: title, subTitle: subTitle }}
          >
            <Form.Item
              label="title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your Title!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="subTitle"
              name="subTitle"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* //富文本编辑器 */}
      </div>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </div>
  )
}
