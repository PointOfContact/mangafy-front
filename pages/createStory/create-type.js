import PrimaryButton from 'components/ui-elements/button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const CreateType = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title, styles.title_type)}>What do you want to create?</div>
                <div className={cn(styles.descr, styles.descr_type)}>Choose the area you want to work in and we’ll help get your started</div>
                <div className={cn(styles.inputContainer , styles.inputContainer_type)}>
                    <input type='text' className={cn(styles.primaryInput, styles.primaryInput_type)}></input>
                    <PrimaryButton
                        text="Let’s go"
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

export default CreateType;