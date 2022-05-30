import PrimaryButton from 'components/ui-elements/button';
// import { Select } from 'antd';
import PrimarySelect from 'components/ui-elements/select';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { projectTypes } from 'helpers/constant';

const CreateType = () => {
    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.content)}>
                <div className={cn(styles.title)}>What do you want to create?</div>
                <div className={cn(styles.descr)}>Choose the area you want to work in and we’ll help get your started</div>
                <PrimarySelect
                    className={styles.select}
                    options={projectTypes.map(pt => ({key: pt, value: pt}))}
                />
                {/* <Select
                    showSearch
                    placeholder={'Select Project Category'}
                    className={styles.select}
                >
                    {projectTypes.map(
                        type => <Select.Option value={type}>{type}</Select.Option>
                    )}
                </Select> */}
                <PrimaryButton
                    text="Let’s go"
                /> 
            </div>
        </div>
    )
}

export default CreateType;