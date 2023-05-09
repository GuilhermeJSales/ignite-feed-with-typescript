import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'


import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author{
  name: string;
  role: string;
  avatarUrl:string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

 interface PostProps {
  post: PostType;
}

export function Post({post}: PostProps){
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale:ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const [comment, setComment] = useState([
    'Post muito bacana, hein?',
    
  ])

  const [newCommentText, setNewCommentText] = useState('');


  function handleCreateNewComment(event: FormEvent){
      event.preventDefault()

      setComment([...comment, newCommentText]);
      setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Este campo é obrigatório')
  }

  function deleteComment(commentToDelete: string){
    const commentsWithoutDeletedOne = comment.filter(comment => {
      return comment !== commentToDelete;
    })
    setComment(commentsWithoutDeletedOne);
  }

  const isNewCurrentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
            <Avatar src={post.author.avatarUrl} />
            <div className={styles.authorInfo}>
              <strong>{post.author.name}</strong>
              <span>{post.author.role}</span>
            </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if(line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>;
          } else if(line.type === 'link'){
            return <p key={line.content}><a href="#">{line.content}</a></p>;
          }
        })}

      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          onChange={handleNewCommentChange}
          placeholder='Escreva um comentário'
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        /> 

        <footer>
          <button type='submit' disabled={isNewCurrentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comment.map(comment => {
          return <Comment 
            key={comment} 
            content={comment}
            onDeleteComment={deleteComment}
          />
        })}
      </div>

    </article>
  )
}