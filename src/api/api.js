import request from './request'

export default {
    // 登陆
    login(params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params,
        })
    },
    // 菜单列表
    getmenuList() {
        return request({
            url: '/admin/menus',
            method: 'get',
        })
    },
    // 首页Header
    frontpageHeader(params) {
        return request({
            url: '/admin/frontpage/header',
            method: 'get',
            data: params
        })
    },
    // 首页Header
    headerOperate(params) {
        return request({
            url: '/admin/frontpage/header/operate',
            method: 'post',
            data: params
        })
    },
    // 首页logo
    logo() {
        return request({
            url: '/logotitle',
            method: 'get',

        })
    },
    // 修改首页logo
    logoOperate(params) {
        return request({
            url: '/admin/frontpage/logo/operate',
            method: 'post',
            data: params

        })
    },
    getBanner() {
        return request({
            url: '/banners',
            method: 'get',

        })
    },
    bannersOperate(params) {
        return request({
            url: '/banners/operate',
            method: 'post',
            data: params
        })
    },
    uploadBanner(params) {
        return request({
            url: '/upload/banner',
            method: 'post',
            data: params
        })
    },
    getArticle(params) {
        return request({
            url: '/article',
            method: 'get',
            data: params
        })
    },
    operateArticle(params) {
        return request({
            url: '/operate/article',
            method: 'post',
            data: params,
        })
    },
}