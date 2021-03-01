import React from 'react';

import { Select, Input, Row, Col } from 'antd';
import cn from 'classnames';
import Card from 'components/card';
import SvgPurplePencil from 'components/icon/PurplePencil';
import AddButton from 'components/ui-elements/add-button';
import PrimaryButton from 'components/ui-elements/button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { TextArea } = Input;

const TabStory = (props) => {
  const {
    storyEditMode,
    setStoryEditMode,
    cancelStoryEditMode,
    saveUserDataByKey,
    setUserData,
    userData,
    userGenres,
    handleChangeGenres,
    genresEnums,
    genres,
    total,
    profile,
    profileGenres,
  } = props;

  const renderStory = () =>
    userGenres &&
    !!userGenres?.length && (
      <Row>
        <Col span={23}>
          {userGenres.map(({ value }, index) => (
            <button key={index} type="button" id={`myProfileGenresTag${index}Id`}>
              {value}
            </button>
          ))}
        </Col>
        <Col span={1} className={styles.add_button}>
          <AddButton onClick={() => setStoryEditMode(true)} />
        </Col>
      </Row>
    );

  const history = useRouter();
  const routeChange = () => {
    const path = `/create-a-story/start`;
    history.push(path);
  };

  return (
    <div className={cn(styles.content_tab_profile_1)}>
      <div className={cn(styles.change_btn)}>
        {storyEditMode && (
          <div className={cn(styles.buttonsProfile, 'buttonsProfile_styles')}>
            <PrimaryButton
              className="buttonsProfile_cancel"
              text="Cancel"
              isDark
              isRound
              disabled={false}
              onClick={cancelStoryEditMode}
            />
            <PrimaryButton
              className="buttonsProfile_save"
              text="save"
              isActive
              isRound
              disabled={false}
              onClick={() => saveUserDataByKey('content', 'genresIds')}
            />
          </div>
        )}
      </div>
      {!userData && profile?.content && (
        <>
          <h3 className={cn(styles.sub_title)}>Here is a my story!</h3>
          {profile?.content && <p className={styles.data_content}>{profile.content}</p>}
        </>
      )}
      <div>
        {userData && (userData?.content || storyEditMode) && (
          <>
            <h3 className={cn(styles.tab_title)}>About Me</h3>
            {storyEditMode || (
              <SvgPurplePencil
                className={styles.editAboutButton}
                onClick={() => setStoryEditMode(true)}
                width="30"
              />
            )}
          </>
        )}
        <div className={styles.text}>
          {storyEditMode ? (
            <TextArea
              autoSize={{ minRows: 3, maxRows: 10 }}
              placeholder="Type here..."
              value={userData.content}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  content: e.target.value,
                })
              }
              required
              type="text"
              minLength={10}
              maxLength={1000}
              className={styles.textarea_text}
            />
          ) : (
            userData?.content && (
              <p className={cn(styles.data_content, styles.tab_sub_title)}>{userData?.content}</p>
            )
          )}
        </div>

        {userGenres && (!!userGenres?.length || storyEditMode) && (
          <h3 className={cn(styles.tab_title)}>Genres</h3>
        )}
        {profileGenres && !!profileGenres?.length && (
          <h3 className={cn(styles.sub_title)}>Genres</h3>
        )}
        <div className={cn('garners_buttons', styles.genres_wrap)}>
          {profileGenres && <h3 className={cn(styles.sub_title)}>Genres</h3>}
          {profileGenres &&
            profileGenres.map(({ name }, index) => (
              <button key={index} type="button" id={`myProfileGenresTag${index}Id`}>
                {name}
              </button>
            ))}
          {storyEditMode ? (
            <Select
              mode="multiple"
              MangaGenres={userData.skills || []}
              placeholder="Type or select an option"
              style={{ width: '100%' }}
              options={genresEnums}
              value={genres}
              onChange={handleChangeGenres}
            />
          ) : (
            renderStory()
          )}
        </div>

        {!userData || storyEditMode || (
          <div className={styles.card_wrap} gutter={[16, 16]}>
            {!userData?.content && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>About Me</h3>
                <Card
                  description="It's time to tell about yourself.</br>  Let's start!"
                  btnText="Tell us about yourself"
                  items={[<img key="1" src="/img/aboutme.png" alt="" />]}
                  onClick={() => setStoryEditMode(true)}
                />
              </div>
            )}
            {!!userGenres?.length || (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Genres</h3>
                <Card
                  description="Select 3 categories that best </br> describe your art"
                  btnText="Choose 3 categories"
                  items={[<img key="1" src="/img/NovelType.png" alt="" />]}
                  onClick={() => setStoryEditMode(true)}
                />
              </div>
            )}
            {total === 0 && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Projects</h3>
                <Card
                  description="Haven't created a project yet? </br> Let's start!"
                  btnText="Create your first project"
                  items={[<img key="1" src="/img/Projects.png" alt="" />]}
                  onClick={() => routeChange()}
                />
              </div>
            )}
          </div>
        )}
        {!profile || storyEditMode || (
          <div className={styles.card_wrap} gutter={[16, 16]}>
            {!profile?.content && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>About Me</h3>
                <Card
                  description="Sorry, but there is nothing <br/> here (("
                  btnText=""
                  items={[<img key="1" src="/img/profile-apout-me.png" alt="" />]}
                  onClick={() => setStoryEditMode(true)}
                />
              </div>
            )}
            {!!profileGenres?.length || (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Novel Type</h3>
                <Card
                  description="Nothing is filled in and it is <br/> very sad (("
                  btnText=""
                  items={[<img key="1" src="/img/ProfileNovelType.png" alt="" />]}
                  onClick={() => setStoryEditMode(true)}
                />
              </div>
            )}
            {total === 0 && (
              <div className={styles.card}>
                <h3 className={cn(styles.sub_title)}>Projects</h3>
                <Card
                  description="There are no projects <br/> here (("
                  btnText=""
                  items={[<img key="1" src="/img/ProfileProjects.png" alt="" />]}
                  onClick={() => routeChange()}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

TabStory.propTypes = {
  storyEditMode: PropTypes.bool,
  setStoryEditMode: PropTypes.func,
  cancelStoryEditMode: PropTypes.func,
  saveUserDataByKey: PropTypes.func,
  setUserData: PropTypes.func,
  userData: PropTypes.object,
  userGenres: PropTypes.array,
  handleChangeGenres: PropTypes.func,
  genresEnums: PropTypes.any,
  genres: PropTypes.array,
  total: PropTypes.number,
  profile: PropTypes.object,
  profileGenres: PropTypes.array,
};

TabStory.defaultProps = {
  setStoryEditMode: () => {},
  cancelStoryEditMode: () => {},
  saveUserDataByKey: () => {},
  setUserData: () => {},
  handleChangeGenres: () => {},
  storyEditMode: false,
  userData: null,
  userGenres: null,
  profile: null,
  genresEnums: null,
  genres: null,
  total: null,
  profileGenres: null,
};

export default TabStory;
