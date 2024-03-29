/**
 * 小程序配置文件
 */

// 此处主机域名修改成服务器的域名
var host = 'https://hope.haier.com/hope_sso';

var service_add = 'https://hope.haier.com/agent_web';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        service_add,
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
