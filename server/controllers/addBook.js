const axios = require('axios')
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {isbn, openId} = ctx.request.body
    const doubanUrl = `https://api.douban.com/v2/book/isbn/${isbn}`

    if (!isbn || !openId) {
        return
    }

    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length > 0) {
        ctx.state = {
            code: -1,
            data: {
                msg: '图书已存在'
            }
        }
        return
    }

    // 从豆瓣api中获取图书信息
    const res = await axios.get(doubanUrl, {
        params: {
            apikey: '0b2bdeda43b5688921839c8ecb20399b'
        }
    })
    const bookinfo = res.data
    const rate = bookinfo.rating.average
    const {title, image, alt, publisher, summary, price} = bookinfo
    const tags = bookinfo.tags.map(tag => {
        return `${tag.title} ${tag.count}`
    }).join(',')
    const author = bookinfo.author.join(',')

    // 将获取到的图书信息添加至数据库
    try {
        await mysql('books').insert({
            isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author
        })

        ctx.state.data = {
            title,
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: `新增失败${e.sqlMessage}`
            }
        }
    }
}
