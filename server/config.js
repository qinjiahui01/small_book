const CONF = {
  /** 本地调试配置 */
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    qcloudAppId: '1301996170',
    qcloudSecretId: 'AKIDRep56BCg26uSzGKUCdnhLtBRRAdAiSGn ',
    qcloudSecretKey: 'OXOHtVrzqQjmgKxJhoQlpC0aw2tBIEgr',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,

    port: '9797',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx0106a1c0354b053e',

    // 微信小程序 App Secret
    appSecret: 'a86b81190d1767fd2b38ce79302ea27e',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'small_book',
        pass: 'root',
        char: 'utf8mb4'
    },

    cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    // eslint-disable-next-line no-dupe-keys
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
