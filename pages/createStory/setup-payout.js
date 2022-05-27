import PrimaryButton from 'components/ui-elements/button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const SetupPayout = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title, styles.title_skip)}>Accept donations</div>
                <div className={cn(styles.descr, styles.descr_type)}>Setup instant payouts to your paypal account</div>
                <div className={cn(styles.inputContainer , styles.inputContainer_skip)}>
                    <input type='text' className={cn(styles.primaryInput, styles.primaryInput_type)} placeholder='Your paypal account'></input>
                    <PrimaryButton
                        text="Let’s go"
                        splitterStyle={{
                            width: '143px',
                            height: '54px',
                        }}
                        />
                </div>
                <span className={cn(styles.skip)}>Skip for now</span>
            </div>
        </div>
    )
}

export default SetupPayout;