require.config({//配置文件
    baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/' ,//基路径
    paths:{
        'jquery':'jquery/1.12.4/jquery.min',//不能带扩展名，属性名称只能是jquery
       'jqvalidate':'jquery-validate/1.19.0/jquery.validate.min',
       'jqlzload':'jquery.lazyload/1.9.1/jquery.lazyload.min',
       'jqcookie':'jquery-cookie/1.4.1/jquery.cookie.min',
    },
    shim:{
        'jqlzload':{
        	exports:'jqlzload',
            deps:['jquery']//依赖
        },
        'jqvalidate':{
			exports:'jqvalidate',
            deps:['jquery']
		}
    }
});