import PrimaryButton from 'components/ui-elements/button';
// import PrimaryInput from 'components/ui-elements/input';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const CreateStory = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Bring your creative ideas to life.</div>
                <div className={cn(styles.descr)}>Accept donations. Find collaborations. Produce  your story. It’s easier than you think.</div>
                <div className={cn(styles.createStoryForm)}>
                    {/* <PrimaryInput/> */}
                    <input type='text' className={cn(styles.input)} placeholder='Your Project'></input>
                    <span className={cn(styles.mangafy)}>.mangafy.club</span>
                </div>
                <div className={styles.buttons}>
                    <PrimaryButton
                        className={styles.button}
                        text="Let’s do it"
                        // splitterStyle={{
                            //     width: '143px',
                            //     height: '54px',
                            // }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateStory;