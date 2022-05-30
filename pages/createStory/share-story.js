import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'

const ShareStory = () => {
  return (
    <div className={cn(styles.container)}>
        <div className={cn(styles.content)}>
            <div className={cn(styles.title)}>Be Proud! You are a hero!</div>
            <div className={cn(styles.descr)}>Share your story with your friends!</div>
            <div className={cn(styles.shareLabel, styles.input)}>
              https://www.darl.mangafy.club/projects
              <button className={styles.copyButton}></button>
              </div>
            <div className={styles.buttons}>
              <button className={cn(styles.shareButton, styles.shareButton_facebook)}></button>
              <button className={cn(styles.shareButton, styles.shareButton_twitter)}></button>
              <button className={cn(styles.shareButton, styles.shareButton_instagram)}></button>
              <button className={cn(styles.shareButton, styles.shareButton_whatsapp)}></button>
            </div>
        </div>
    </div>
  )
}

export default ShareStory