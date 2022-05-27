import PrimaryButton from 'components/ui-elements/button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const CreateStory = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Bring your creative ideas to life.</div>
                <div className={cn(styles.descr)}>Accept donations. Find collaborations. Produce  your story. It’s easier than you think.</div>
                <div className={cn(styles.inputContainer)}>
                    <input type='text' className={cn(styles.primaryInput, styles.primaryInput_story)} placeholder='Your Project'></input>
                    <span className={cn(styles.mangafyClub)}>.mangafy.club</span>
                    <PrimaryButton
                        text="Let’s do it"
                        splitterStyle={{
                            width: '143px',
                            height: '54px',
                        }}
                        />
                </div>
            </div>
        </div>
    )
}

export default CreateStory;