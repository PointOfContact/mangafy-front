import PrimaryButton from 'components/ui-elements/button';
// import PrimaryInput from 'components/ui-elements/input';
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { notification } from 'antd';

const CreateStory = ({ storyInfo, goNext, setStoryInfo }) => {

    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef(null)

    function inputChangeHandler() {
        if (!inputRef.current) return;
        setIsValid(true);
        setStoryInfo({ ...storyInfo, projectName: inputRef.current.value.trim()});
    }

    function nextHandler() {
        if (!storyInfo.projectName) {
            notification.error({
                message: 'Please enter the name of your project',
                placement: 'bottomLeft',
            });
            setIsValid(false);
        }
        else {
            setLoading(true)
            goNext()
        }
    }

    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Bring your creative ideas to life.</div>
                <div className={cn(styles.descr)}>Accept donations. Find collaborations. Produce  your story. It’s easier than you think.</div>
                <div className={cn(styles.createStoryForm)}>
                    <input
                        type='text' 
                        className={cn(styles.input, !isValid && styles.input_error)} 
                        placeholder='Your Project'
                        ref={inputRef}
                        onChange={inputChangeHandler}
                        defaultValue={storyInfo.projectName}
                    />
                    <span className={cn(styles.mangafy)}>.mangafy.club</span>
                </div>
                <div className={styles.buttons}>
                    <PrimaryButton
                        text="Let’s do it"
                        onClick={nextHandler}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateStory;