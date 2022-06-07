import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames'
import styles from './styles.module.scss'
import { notification } from 'antd'
import { ShareButtons } from 'components/share';
import SvgCopy from 'components/icon/Copy';
import SvgClose from 'components/icon/Close';
import PrimaryButton from 'components/ui-elements/button';

const ShareStory = ({ link }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function copyHandler() {
    navigator.clipboard.writeText(link)
    notification.success({
      placement: 'bottomLeft',
      message: 'Copied to clipboard'
    })
  }

  return (
    <div className={cn(styles.container)}>
      <Link href='/feed'>
        <a className={styles.toFeed}>
          <SvgClose/>
        </a>
      </Link>
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