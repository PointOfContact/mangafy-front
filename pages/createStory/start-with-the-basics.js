import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import PrimaryButton from 'components/ui-elements/button';

const StepperDomainName = () => {

    const textareaRef = useRef(null);
    const textareaAutoresize = () => {
        textareaRef.current.style.height = 'inherit';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    useEffect(() => {
        textareaAutoresize();
    }, []);

    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <h4 className={cn(styles.title)}>Start with the basics</h4>
                <p className={cn(styles.descr)}>Give your project a clear title and subtitle that will help people understand it quickly. The titles and subtitles will appear on your project and pre-launch pages.</p>
                <div className={cn(styles.basicsForm)}>
                    <input
                        type="text"
                        className={cn(styles.input)}
                        placeholder='Series Title'/>
                    <textarea
                        ref={textareaRef}
                        className={cn(styles.input, styles.textarea)}
                        placeholder='State what your project is, and what makes it unique. Avoid using all caps or exclamation points. Be honest and transparent'
                        onChange={textareaAutoresize}>
                    </textarea>
                    <div className={styles.buttons}>
                        <PrimaryButton
                            text="Create an Account to save your project"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepperDomainName;