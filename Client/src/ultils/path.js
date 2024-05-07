const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS_CATEGORY: ':category',
    OUR_SERVICES : 'services',
    BLOGS: 'blogs',
    FAQ: 'contact',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    RESET_PASSWORD:'reset-password/:token',
    CART : 'cart',
    DETAIL_CART : 'detail-cart',
    CHECK_OUT : 'check-out',
    PRODUCTS : 'products',
    WISHLIST: 'whistlist',
    

    //Admin
    ADMIN : 'admin',
    // DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCTS: 'create-products',

    // Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my-cart',
    HISTORY: 'buy-history',
    
}
export default path
