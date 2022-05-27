import PrimaryButton from 'components/ui-elements/button';
import { Select } from 'antd';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { projectTypes } from 'helpers/constant';

const CreateType = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title, styles.title_type)}>What do you want to create?</div>
                <div className={cn(styles.descr, styles.descr_type)}>Choose the area you want to work in and we’ll help get your started</div>
                <div className={cn(styles.inputContainer, styles.inputContainer_type)}>
                    <Select
                        showSearch
                        placeholder={'Select Project Category'}
                        className={styles.selectType}
                    >
                        {
                            projectTypes.map(type =>   
                                <Select.Option value={type}>{type}</Select.Option>
                            )
                        }
                    </Select>
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