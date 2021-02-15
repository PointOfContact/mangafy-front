import React, { useState, useEffect } from 'react';

import { Upload, Row, Col, Popconfirm } from 'antd';
import client from 'api/client';
import SvgDustbin from 'components/Icon/Dustbin';
import SvgHeart from 'components/Icon/Heart';
import AddButton from 'components/ui-elements/add-button';
import SocialButton from 'components/ui-elements/social-button';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import styles from './style.module.scss';

export const Gallery = (props) => {
  const { user = false, profile, mangaStories, fromPath = 'users', title = '' } = props;
  let canEditInit;
  if (!user) {
    canEditInit = false;
  } else if (!profile && user) {
    canEditInit = true;
  } else if (profile._id === user._id) {
    canEditInit = true;
  }
  const socials = [
    {
      id: '1',
      name: 'facebook',
      link: 'https://facebook.com',
    },
    {
      id: '2',
      name: 'twitter',
      link: 'https://twitter.com',
    },
    {
      id: '3',
      name: 'instagram',
      link: 'https://instagram.com',
    },
    {
      id: '4',
      name: 'dribbble',
      link: 'https://dribbble.com',
    },
    {
      id: '5',
      name: 'deviantart',
      link: 'https://deviantart.com',
    },
    {
      id: '6',
      name: 'behance',
      link: 'https://behance.com',
    },
  ];

  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState(user);
  const [showUploadList, setShowUploadList] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [canEdit, setCanEdit] = useState(canEditInit);
  const prepareDataImages = (gallery) => {
    const prepareData = [];
    gallery &&
      gallery.forEach((item) => {
        prepareData.push({
          original: client.UPLOAD_URL + item,
          _id: item,
        });
      });
    return prepareData;
  };

  const adaptedDataImages = (res) => {
    const adaptedData = [...images.map((item) => item._id), res.id];
    return adaptedData;
  };

  useEffect(() => {
    const data = [];
    if (canEdit) {
      if (fromPath === 'users') {
        userData &&
          userData.gallery.forEach((item) => {
            data.push({
              original: client.UPLOAD_URL + item,
              _id: item,
            });
          });
      } else {
        mangaStories &&
          mangaStories.gallery &&
          mangaStories.gallery.forEach((item) => {
            data.push({
              original: client.UPLOAD_URL + item,
              _id: item,
            });
          });
      }
    } else {
      profile &&
        profile.gallery.forEach((item) => {
          data.push({
            original: client.UPLOAD_URL + item,
            _id: item,
          });
        });
    }
    setImages(data);
  }, images);

  function confirm(e, _id) {
    removeImg(e, _id);
  }

  function cancel() {}

  const removeImg = (e, _id) => {
    e.stopPropagation();
    const newImages = images.filter((item) => item._id !== _id);
    const data = { gallery: [...newImages.map((item) => item._id)] };
    const jwt = client.getCookie('feathers-jwt');

    import('api/restClient').then((m) => {
      m.default
        .service(`/api/v2/${fromPath}`)
        .patch(userData._id, data, {
          headers: { Authorization: `Bearer ${jwt}` },
          mode: 'no-cors',
        })
        .then((res) => {
          setUserData(res);
          setImages(prepareDataImages(res.gallery));
        })
        .catch((err) => {
          setErrMessage(err.message);
        });
    });
  };

  const gallerySet = (e, indexImg) => {
    const currentImg = images[indexImg];
    const ll = images.filter((item, index) => index !== indexImg);
    const newArr = [currentImg, ...ll];
    setShowGallery(true);
    setImages(newArr);
  };

  const beforeGalleryUpload = (file) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener(
      'load',
      () => {
        const jwt = client.getCookie('feathers-jwt');
        import('api/restClient')
          .then((m) => {
            m.default
              .service('/api/v2/uploads')
              .create(
                { uri: reader.result },
                {
                  headers: { Authorization: `Bearer ${jwt}` },
                  mode: 'no-cors',
                }
              )
              .then((response) => {
                setShowUploadList(false);
                return response;
              })
              .then((response) => {
                m.default
                  .service(`/api/v2/${fromPath}`)
                  .patch(
                    fromPath === 'users' ? userData._id : mangaStories._id,
                    {
                      gallery: adaptedDataImages(response),
                    },
                    {
                      headers: { Authorization: `Bearer ${jwt}` },
                      mode: 'no-cors',
                    }
                  )
                  .then((res) => {
                    setImages(prepareDataImages(res.gallery));
                    setUserData(res);
                    setShowUploadList(false);
                  });
              })
              .catch((err) => {
                setErrMessage(err.message);
                setShowUploadList(false);
                setTimeout(() => {
                  setErrMessage('');
                }, 2000);
              });
          })
          .catch((err) => {
            setErrMessage(err.message);
            setShowUploadList(false);
            setTimeout(() => {
              setErrMessage('');
            }, 2000);
          });
      },
      false
    );
  };
  return (
    <div>
      {showGallery && (
        <div className={styles.main_popup}>
          <ImageGallery
            lazyLoad={true}
            useBrowserFullscreen={true}
            showIndex={true}
            autoPlay={false}
            items={images}
          />
        </div>
      )}
      <h4 className={styles.title}>{title}</h4>
      {errMessage && <p>{errMessage}</p>}
      <Row>
        <Col span={23}>
          <div className={styles.imagesBlock}>
            {images.length
              ? images.map((item, index) => (
                  <div key={index} className={styles.galleryImg}>
                    {canEditInit && (
                      <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={(e) => confirm(e, item._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <span className={styles.dustbin} data-id={item._id}>
                          <SvgDustbin width="18px" />
                        </span>
                      </Popconfirm>
                    )}
                    <span className={styles.heart}>
                      <SvgHeart width="18px" height="16px" />
                      <span>122</span>
                    </span>
                    <div className={styles.filter} onClick={(e) => gallerySet(e, index)}></div>
                    <img src={client.UPLOAD_URL + item._id} alt="" />
                  </div>
                ))
              : null}
          </div>
        </Col>
        {canEditInit && (
          <Col span={1} className={styles.img_add_button}>
            <Upload beforeUpload={beforeGalleryUpload} showUploadList={showUploadList}>
              <div className="">
                <AddButton onClick={() => setCanEdit(false)} />
              </div>
            </Upload>
          </Col>
        )}
      </Row>

      <h4 className={styles.title}>Social</h4>
      <div className={styles.social}>
        <Row>
          <Col span={23}>
            {socials.map((social) => (
              <span key={social.id} className={styles.social_icons}>
                <a href={`${social.link}`} rel="noreferrer" target="_blank">
                  <SocialButton name={social.name} />
                </a>
              </span>
            ))}
          </Col>

          <Col span={1} className={styles.add_button}>
            {canEditInit && <AddButton onClick={() => 'aaa'} />}
          </Col>
        </Row>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object,
  mangaStories: PropTypes.array.isRequired,
  fromPath: PropTypes.string,
  title: PropTypes.string,
};

Gallery.defaultProps = {
  profile: null,
  title: '',
  fromPath: 'users',
};
