import PrimaryButton from 'components/ui-elements/button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const SetupPayout = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>Accept donations</div>
                <div className={cn(styles.descr)}>Setup instant payouts to your paypal account</div>
                <input type='text' className={cn(styles.input)} placeholder='Your paypal account'></input>
                <div className={styles.buttons}>
                    <PrimaryButton
                        text="Let’s go"
                    />
                </div>
                <button className={cn(styles.skip)}>Skip for now</button>
            </div>
        </div>
    )
}

export default SetupPayout;