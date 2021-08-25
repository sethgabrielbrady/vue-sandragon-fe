import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Elements from '@/components/Elements'
import Posts from '@/components/Posts/Posts'
import edit from '@/components/Posts/edit'
import Materials from '@/components/Materials/Materials'
import editor from '@/components/Materials/editor'
import Upload from '@/components/Upload'


export default new Router({
  routes: [
    {path: '/signin', name: 'Signin', component: Signin},
    {path: '/signup', name: 'Signup', component: Signup},
    {path: '/elements', name: 'Elements', component: Elements},
    {path: '/posts', name: 'Posts', component: Posts,},
    {path: '/posts/:id', component: Posts, children: [
      {path: 'editor', component: edit }
    ]},
    {path: '/materials', name: 'Materials', component: Materials},
    {path: '/materials/:id', component: Materials, children: [
      {path: 'editor', component: editor}
    ]},
    {path: '/upload', name:'Upload', component: Upload}
  ]
})
