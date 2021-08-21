import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'


export default new Router({
  routes: [
    {path: '/signin', name: 'Signin', component: Signin},
    {path: '/signup', name: 'Signup', component: Signup},


  ]
})

