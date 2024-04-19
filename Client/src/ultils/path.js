const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    OUR_SERVICES : 'services',
    BLOGS: 'blogs',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    RESET_PASSWORD:'reset-password/:token',
    

    //Admin
    ADMIN : 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCTS: 'create-products',

    // Member

    MEMBER: 'member',
    PERSONAL: 'personal'
}
export default path
