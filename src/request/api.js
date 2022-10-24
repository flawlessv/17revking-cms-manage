import request from './request'
//注册
export const RegisterApi = (params) => request.post('/register',params)
//登录
export const LoginApi = (params) => request.post('/login',params)
//获取文章
export const getArticleApi = (params) => request.get('/article',{params})
//添加文章
export const addArticleApi = (params) => request.post('/article/add',params)
//查看文章
export const ArticleLookApi = (params) => request.get(`/article/${params.id}`)
//更新文章
export const ArticleUpdateApi = (params) => request.put('/article/update',params)
//更新文章
export const DeleteArticleApi = (params) => request.post('/article/remove',params)
//获取用户信息
export const getUserDataApi=()=>request.get('/info')
//修改用户资料
export const changeUserDataApi=(params)=>request.put('/info',params)
