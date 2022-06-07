import PrimaryButton from 'components/ui-elements/button'
import React, { useRef, useState } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { notification } from 'antd'

const SetupPayout = ({ storyInfo, createStory, goBack, setStoryInfo }) => {

    const [loading, setLoading] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef(null)

    function inputChangeHandler() {
        if (!inputRef.current) return;
        setIsValid(true);
        setStoryInfo({ ...storyInfo, paypal: inputRef.current.value.trim()});
    }

    function nextHandler() {
        if (!storyInfo.paypal) {
            setIsValid(false);
            notification.error({
                message: 'Please enter your paypal or skip this step',
                placement: 'bottomLeft',
            });
        }
        else {
            setLoading('next')
            createStory()
        }
    }

    function skipHandler() {
        setStoryInfo({ ...storyInfo, paypal: inputRef.current?.value});
        setLoading('next')
        createStory();
    }

    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Accept donations</div>
                <div className={cn(styles.descr)}>Setup instant payouts to your paypal account</div>
                <input 
                    onChange={inputChangeHandler}
                    ref={inputRef} 
                    type='text' 
                    className={cn(styles.input, !isValid && styles.input_error)} 
                    placeholder='Your paypal account'
                />
                <div className={styles.buttons}>
                    <PrimaryButton
                        isWhite={true}
                        className={styles.button_blackLoading}
                        text="Go back"
                        onClick={ () => {setLoading('prev'); goBack()} }
                        loading={loading === 'prev'}
                    />
                    <PrimaryButton
                        text="Let’s go"
                        onClick={nextHandler}
                        loading={loading === 'next'}
                    />
                </div>
                <button 
                    onClick={skipHandler}
                    className={cn(styles.skip)}
                >Skip for now</button>
            </div>
        </div>
    )
}

export default SetupPayout;