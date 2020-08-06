module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        port: '8777',
        proxy: {
            '/apis': {
                target: 'http://112.19.171.231:1989/quotescenter/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/apis': '/'
                }
                /* 对应 nginx 的 配置
                    location /apis {
                        proxy_pass http://112.19.171.231:1989/quotescenter/;
        }
                */
            }
        }
    },
    // 这里有问题，不知道 缺少了啥，用途 是 混入 全局，在任何地方都能用的; 解决方式 这块 改了 写法 data 换为 prependData了
    // 添加全局的 scss 变量
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/styles/variable.scss";'
            }
        }
    },
}