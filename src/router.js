import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Elements from '@/components/Elements'
import PostsList from '@/components/Posts/PostsList'
import Edit from '@/components/Posts/edit'
import Materials from '@/components/Materials/Materials'
import editor from '@/components/Materials/editor'
import Admin from '@/components/Admin'


export default new Router({
  mode: 'history',
  routes: [
    {path: '/signin', name: 'Signin', component: Signin},
    {path: '/signup', name: 'Signup', component: Signup},
    {path: '/elements', name: 'Elements', component: Elements},
    {path: '/posts', name: 'PostsList', component: PostsList},
    {path: '/posts/edit/:id', name: Edit,  component: Edit },
    {path: '/materials', name: 'Materials', component: Materials},
    {path: '/materials/:id', component: Materials,  children: [
      {path: 'editor', component: editor}
    ]},
    {path: '/admin', name:'Admin', component: Admin}
  ]
})
