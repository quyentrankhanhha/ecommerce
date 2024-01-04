const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  history: '/user/history',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const

export default path
