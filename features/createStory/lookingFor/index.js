import React, { useEffect, useState } from 'react';

import { Button, Checkbox } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import Imgix from 'components/imgix';
import ModalCreateProject from 'components/modalCreateProject';
import { EVENTS } from 'helpers/amplitudeEvents';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';
import { v4 as uuidv4 } from 'uuid';

import { USER_TYPES } from './constant';

const LookingFor = ({ user }) => {
  const [loadings, changeLoading] = useState([]);
  const [checked, changeChecked] = useState(false);
  const [createProjectModal, showCreateProjectModal] = useState(false);
  const [checkboxes, changeCheckboxes] = useState(USER_TYPES);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const checkboxesManga = mangaData.collaborators || checkboxes;
    changeChecked(!!checkboxesManga.find(({ checked }) => !!checked));
    changeCheckboxes(checkboxesManga);
  }, []);

  useEffect(() => {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.collaborators = checkboxes;
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  });

  const enterLoading = (index) => {
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    changeLoading(newLoadings);
    const data = {
      event_type: EVENTS.CREATE_MANGA_STORY_LOOKING_FOR_NEXT,
      event_properties: {
        data: checkboxes,
      },
    };
    if (user) {
      data.user_id = user._id;
      data.user_properties = user;
    } else {
      data.device_id = uuidv4();
    }
    myAmplitude([data]);
  };

  const onChangeCheckBox = (index) => {
    const checkboxesCur = [...checkboxes];
    checkboxesCur[index].checked = !checkboxes[index].checked;
    const checkedCur = !!checkboxesCur.find(({ checked }) => !!checked);
    changeChecked(checkedCur);
    changeCheckboxes(checkboxesCur);
  };

  return (
    <>
      <Head></Head>
      <div className="sign_in_page_container">
        <div className="bottom-logo">
          <div className="nav1 nav1_logo">
            <div className="flex-center">
              <Link href="/">
                <a>
                  <Imgix
                    layout="fill"
                    src="https://mangafy.club/img/logoText.webp"
                    alt="MangaFy logo text"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="container form_container">
          <div className="row collab_radio">
            <div className="col-lg-12 col-md-12 col-sm-12 flex-center">
              <h1 className="collab form_header_title">
                Define who you would like to collaborate with on your project?
              </h1>
              <p className="title_text">
                At MangaFY we believe collaboration between aspiring artists can give birth to the
                next big hit! And it should not be a solo act. After all, some of the most iconic
                heroes came from joint efforts.
              </p>
              <div style={{ width: '100%' }}>
                <div className="row col_padding">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <ul className="collaboratChoose">
                      {checkboxes.slice(0, 6).map((label, index) => (
                        <li>
                          <Checkbox checked={label.checked} onClick={() => onChangeCheckBox(index)}>
                            {label.label}
                          </Checkbox>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <ul className="collaboratChoose">
                      {checkboxes.slice(6).map((label, index) => (
                        <li>
                          <Checkbox
                            onClick={() => onChangeCheckBox(index + 6)}
                            checked={label.checked}>
                            {label.label}
                          </Checkbox>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="choose_text">
                  Choose as many roles as you looking to add to your project
                </p>
                <hr />
                <div className="next_prev">
                  <Button
                    id="lookingForPrevBtnId"
                    className="title_but_prev "
                    onClick={() => showCreateProjectModal(true)}>
                    <SvgLeftArrow width="13.503px" height="23.619px" />
                    <span> Previous</span>
                  </Button>
                  <Link href="/create-a-story/model">
                    <a>
                      <Button
                        id="lookingForNextBtnId"
                        disabled={!checked}
                        type="primary"
                        className="title_but btn_next"
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}>
                        <span>Next</span>
                        <SvgRightArrow width="13.503px" height="23.619px" />
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateProject
        createProjectModal={createProjectModal}
        showCreateProjectModal={showCreateProjectModal}
      />
    </>
  );
};
LookingFor.propTypes = {
  user: PropTypes.object,
};
LookingFor.defaultProps = {
  user: {},
};

export default LookingFor;
