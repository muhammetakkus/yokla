import {store} from '../store/store'
export default (to, from, next) => {
  if (store.getters.isAuth) {
    next()
  } else {
    next('/login')
  }
}
