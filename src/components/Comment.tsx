import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}:CommentProps){
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content)
  }

  function handleLikeCount(){
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
    <Avatar hasBorder={false} src="https://github.com/diego3g.png" alt=""/>
        <div className={styles.commentBox}>
      <div className={styles.commentContent}>
        <header>
          <div className={styles.authorAndTime}>
            <strong>Guilherme Jesus Sales</strong>
            <time title="29 de Abril de 2023 às 21:40h" dateTime='2023-04-29 21:40:30'>Cerca de 1h atrás</time>
          </div>

          <button onClick={handleDeleteComment} title='Deletar comentário'>
            <Trash size={24} />
          </button>
        </header>
        <p>{content}</p>
      </div>

      <footer>
        <button onClick={handleLikeCount}>
          <ThumbsUp />
          Aplaudir <span>{likeCount}</span>
        </button>
      </footer>
    </div>
    </div>
  )
}