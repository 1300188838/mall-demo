module.exports ={
    configureWebpack:{
        resolve:{
            // extensions:[]  过滤文件后缀
            alias:{
                'assets': '@/assets',
                'api': '@/api',
                'common': '@/common',
                'components': '@/components',
                'view': '@/view'
            }
        }
    }
}