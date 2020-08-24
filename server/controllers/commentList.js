const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {bookId, openId} = ctx.request.query
    const mysqlSelect = mysql('comments').select('comments.*', 'cSessionInfo.user_info')
                                            .join('csessioninfo', 'comments.openId', 'csessionInfo.open_id')
    let comments = null
    if (bookId) {
        // 图书详情页的评论列表
        comments = await mysqlSelect.where('bookId', bookId)
    } else if (openId) {
        // 根据个人的openId筛选
        comments = await mysqlSelect.where('openId', openId)
    }
    ctx.state.data = {
        list: comments.map(val => {
            const info = JSON.parse(val.user_info)
            return Object.assign({}, val, {
                title: info.nickName,
                image: info.avatarUrl
            })
        })
    }
}
