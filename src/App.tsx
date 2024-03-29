import { Post, PostType } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import styles from './App.module.css'
import './global.css'



const posts: PostType[]  = [
  {
    id:1,
    author: {
      avatarUrl:'https://github.com/GuilhermeJSales.png',
      name: 'Guilherme Jesus Sales',
      role: 'Web Developer'
    },
    content:[
      {type:'paragraph', content:'Fala galeraa 👋'},
      {type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é Impulse 🚀'},
      {type:'link', content:'github.com/GuilhermeJSales'},
    ],
    publishedAt: new Date('2023-05-01 22:13:00')
  },
  {
    id:2,
    author: {
      avatarUrl:'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat'
    },
    content:[
      {type:'paragraph', content:'Fala galeraa 👋'},
      {type:'paragraph', content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é Impulse 🚀'},
      {type:'link', content:'github.com/diego3g'},
    ],
    publishedAt: new Date('2023-04-20 20:13:00')
  }
]

export function App() {
  return (
    <div>    
      <Header />
    <div className={styles.wrapper}>
      <Sidebar />
      <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                post={post}
              />
            )
          })}
      </main>
    </div>
   </div>

  )
}



