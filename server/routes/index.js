/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/webapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)
// 添加图书接口
router.post('/addBook', controllers.addBook)
// 图书列表接口
router.get('/bookList', controllers.bookList)
// 图书详情接口
router.get('/bookDetail', controllers.bookDetail)
// 图书排名接口
router.get('/top', controllers.top)
// 添加评论接口
router.post('/addComment', controllers.addComment)
// 评论列表接口
router.get('/commentList', controllers.commentList)

module.exports = router
