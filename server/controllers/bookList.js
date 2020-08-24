const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { page, size, openId } = ctx.request.query

    const sqlSelect = mysql('books')
    .select('books.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
    .orderBy('id', 'desc')

    let books = {}
    if (openId) {
    // 根据openId过滤
        books = await sqlSelect.where('books.openId', openId)
    } else {
    // eslint-disable-next-line eqeqeq
        if ((!Number(page) || !Number(size)) && page != 0) {
            ctx.state = {
                code: -1,
                data: {
                    msg: 'page、size字段必须为数字'
                }
            }
            return
        }
    // 分页
        books = await sqlSelect.limit(size).offset(page * size)
    }
    ctx.state.data = {
        list: books.map((v) => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
