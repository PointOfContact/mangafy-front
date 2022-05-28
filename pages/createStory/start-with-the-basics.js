import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';

export default () => {

    const textareaRef = useRef(null);
    const textareaAutoresize = () => {
        textareaRef.current.style.height = 'inherit';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    useEffect(() => {
        textareaAutoresize();
    }, []);

    return (
        <div className={cn(styles.container, styles.container_basics)}>
            <div className={cn(styles.content, styles.content_basics)}>
                <h4 className={cn(styles.title, styles.title_basics)}>Start with the basics</h4>
                <p className={cn(styles.descr, styles.descr_basics)}>Give your project a clear title and subtitle that will help people understand it quickly. The titles and subtitles will appear on your project and pre-launch pages.</p>
                <form className={cn(styles.inputContainer, styles.inputContainer_basics)}>
                    <input 
                        type="text" 
                        className={cn(styles.primaryInput, styles.primaryInput_basics)}
                        placeholder='Series Title'/>
                    <textarea
                        ref={textareaRef}
                        className={cn(styles.primaryInput, styles.primaryInput_basics, styles.textarea)}
                        placeholder='State what your project is, and what makes it unique. Avoid using all caps or exclamation points. Be honest and transparent'
                        onChange={textareaAutoresize}>
                    </textarea>
                    <PrimaryButton
                        className={styles.button_basics}
                        text="Create an Account to save your project"
                    />
                </form>
            </div>
        </div>
    )
}