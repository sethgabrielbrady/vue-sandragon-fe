import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Posts from '@/components/Posts/Posts'
import Edit from '@/components/Posts/edit'
import Materials from '@/components/Materials/Materials'
import Editor from '@/components/Materials/editor'
import _Slug from '@/components/Materials/_slug'
import Admin from '@/components/Admin'
import Homepage from '@/components/Homepage'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Privacy from '@/components/Privacy'
import Account from '@/components/Account'
import View from '@/components/Posts/View'


export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name:'Homepage', component: Homepage},
    {path: '/homepage', redirect: { name: 'Homepage' }},
    {path: '/signin', name: 'Signin', component: Signin},
    {path: '/signup', name: 'Signup', component: Signup},
    {path: '/posts', name: 'Posts', component: Posts},
    {path: '/posts/edit/', name: Edit,  component: Edit },
    {path: '/posts/view/', name: View, component: View },
    {path: '/content', name: 'Materials', component: Materials},
    {path: '/materials/editor/', name: Editor, component: Editor },
    {path: '/content/:slug', name: _Slug, component: _Slug },
    {path: '/admin', name:'Admin', component: Admin},
    {path: '/about', name:'About', component: About},
    {path: '/contact', name:'Contact', component: Contact},
    {path: '/privacy-policy', name:'Privacy', component: Privacy},
    {path: '/account', name:'Account', component: Account}
  ]
})
