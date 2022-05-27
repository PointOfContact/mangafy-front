import PrimaryButton from 'components/ui-elements/button';
import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import CreateStory from './create-story';



const CreatePage = () => {
    return (
        <div>
           <CreateStory/>
        </div>
    );
};

export default CreatePage;