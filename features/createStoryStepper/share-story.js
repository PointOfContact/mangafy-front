import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { notification } from 'antd'
import { ShareButtons } from 'components/share';
import SvgCopy from 'components/icon/Copy';

const ShareStory = ({ link }) => {

  function copyHandler() {
    navigator.clipboard.writeText(link)
    notification.success({
      placement: 'bottomLeft',
      message: 'Copied to clipboard'
    })
  }

  return (
    <div className={cn(styles.container)}>
        <div className={cn(styles.content)}>
            <div className={cn(styles.title)}>Be Proud! You are a hero!</div>
            <div className={cn(styles.descr)}>Share your story with your friends!</div>
            <div className={cn(styles.shareLabel, styles.input)}>
              { link }
              <button className={styles.copyButton} onClick={copyHandler}><SvgCopy /></button>
            </div>
            <ShareButtons
              shareUrl={link}
              showTitle={true}
              className={styles.shareButtons}
            />
        </div>
    </div>
  )
}

export default ShareStory