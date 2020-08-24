/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs')
const path = require('path')
const { mysql: config } = require('../config')

console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const AUTH_DB_FILE = path.join(__dirname, './cAuth.sql')
const BOOK_DB_FILE = path.join(__dirname, './books.sql')
const COMMENT_DB_FILE = path.join(__dirname, './comments.sql')

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
})

console.log(`准备读取 SQL 文件：${AUTH_DB_FILE}`)

// 读取 .sql 文件内容
const authContent = fs.readFileSync(AUTH_DB_FILE, 'utf8')
const bookContent = fs.readFileSync(BOOK_DB_FILE, 'utf8')
const commentContent = fs.readFileSync(COMMENT_DB_FILE, 'utf8')

console.log('开始执行 SQL 文件...')

// 待创建的表
const tableArr = [authContent, bookContent, commentContent]
function createTables (tableArr) {
    const promiseArr = []
    for (let i = 0; i < tableArr.length; i++) {
        promiseArr[i] = DB.raw(tableArr[i]).then(res => {
            console.log('cAuth表创建成功')
        }, err => {
            throw new Error(err)
        })
    }
    return promiseArr
}

// 初始化数据库
const result = createTables(tableArr)
Promise.all(result).then(res => {
    console.log('数据库初始化成功')
}, err => {
    throw new Error(err)
})

