import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Elements from '@/components/Elements'
import Posts from '@/components/Posts'

export default new Router({
  routes: [
    {path: '/signin', name: 'Signin', component: Signin},
    {path: '/signup', name: 'Signup', component: Signup},
    {path: '/elements', name: 'Elements', component: Elements},
    {path: '/posts', name: 'Posts', component: Posts}
  ]
})
