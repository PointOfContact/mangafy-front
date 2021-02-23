import React from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment'
import SvgPortfolio from '../icon/Portfolio';
import PopoverCard from '../popoverCard';
import styles from './styles.module.scss';
import Router from 'next/router';

const ProfilesCard = ({ label, client }) =>  {
  const handleCallbCardsClick = (id) => {
    console.log(id)
    Router.push({
      pathname: `/profile/${id}`,
      query: {},
    });
  };
  if(!label){
    return  <></>
  }
   return <>
    
    <div onClick={() => handleCallbCardsClick(label._id)} className={styles.colabWrap__item}>
      <div className={styles.colabWrap__top}>
         <div className={cn(styles.avatar__img, styles.avatar__imgOnline)}>
          <div className={styles.avatar__avatar}>
            <img
              src={label.image ? client.UPLOAD_URL + label.image : '/img/mangastory.jpg'}
              alt=""></img>
          </div>
         </div>
        <div className={styles.colabWrap__name}>
          <div className={styles.colabWrap__authorName}>{label.name}</div>
           <div className={styles.colabWrap__authorDescr}>{label.type}</div>
        </div>
      </div>
      <div className={styles.colabWrap__descr}>{label.description}</div>
      <div className={styles.colabWrap__buttons}>
        {label.skills.map((item) => (
          <ButtonColab key={item._id} className={cn(styles.ButtonPurple)} text={item.content} />
        ))}
      </div>
      <div className={styles.colabWrap__bot}>
        <div className={styles.colabWrap__commision}>
          <img src="icons/suitcase.svg" alt=""></img>
          {label.compensationModel == 'paid' ? 'Commission' : 'Collaboration'}
        </div>
        <div className={styles.colabWrap__commision}>
              <SvgPortfolio width="14px" height="14px" />
                {label.collaboration == 'paid' ? 'Paid Collab' : 'Joint Collab'}
          </div>
      </div>
    </div>
    </>
    }
  

ProfilesCard.prototype = {
  users: PropTypes.array,
  client: PropTypes.object,
};

export default ProfilesCard;
