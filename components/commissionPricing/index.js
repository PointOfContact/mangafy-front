import React, { useState, useEffect } from 'react';

import { MinusCircleOutlined } from '@ant-design/icons';
import { Input, Button, Space, notification } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Card from 'components/card';
import SvgPurplePencil from 'components/icon/PurplePencil';
import Imgix from 'components/imgix';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

export const CommissionPricing = ({ id, user }) => {
  const [pricingList, setPricingList] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState(false);
  const [addMore, setAddMore] = useState(false);
  const canEdit = !user ? false : id === user._id;

  const getPricing = () => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/users')
        .find({
          query: {
            _id: id,
          },
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => {
          setPricingList(res.data[0].pricingTable || []);
        })
        .catch((err) => {
          setErrMessage(err.message);
          return err;
        });
    });
  };

  const setPricing = () => {
    const empti = pricingList.find((item) => item.first === '' || item.last === '');
    if (!empti) {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/users')
          .patch(
            id,
            { pricingTable: pricingList },
            {
              headers: { Authorization: `Bearer ${jwt}` },
              mode: 'no-cors',
            }
          )
          .then((res) => {
            setPricingList(res.pricingTable);
            setEditMode(false);
          })
          .catch((err) => {
            setErrMessage(err.message);
            return err;
          });
      });
    } else {
      notification.error({
        message: 'invalid Form',
      });
      setSubmitted(true);
    }
  };

  useEffect(() => {
    getPricing();
  }, []);

  const handleChange = ({ target, currentTarget }) => {
    const newList = [...pricingList];
    const newId = currentTarget.dataset.id;
    const { value, name } = target;
    newList[newId][name] = value;
    setPricingList(newList);
    // if input value is not a empty
    setInputValue(!!target.defaultValue.length + 1);
  };

  const add = () => {
    const data = [
      {
        platform: 'WEB',
        event_type: EVENTS.COMMISION_CREATED,
        user_id: user._id,
        user_properties: {
          ...user,
        },
      },
    ];
    amplitude.track(data);
    const newList = [...pricingList, { first: '', last: '' }];
    setPricingList(newList);
  };

  const remove = (position) => {
    const newList = pricingList.filter((item, index) => index !== position);
    setPricingList(newList);
  };

  return (
    <div className={`title d-flex`}>
      <div className="buttons change_btn_commission col-lg-12">
        {canEdit && (
          <SvgPurplePencil
            className={styles.editAboutButton}
            onClick={() => setEditMode(true)}
            width="30"
          />
        )}
      </div>
      <div className="">
        <div className="">
          <div className="">
            <div className={cn('pricingBlock', styles.pricingBlock_wrap)}>
              {!pricingList.length && id !== user?._id && (
                <div className={styles.noContent}>
                  <Card
                    className={styles.card}
                    description="Sorry, but there is nothing <br/> here (("
                    btnText=""
                    items={[
                      <Imgix
                        key="1"
                        width={124}
                        height={140}
                        layout="fixed"
                        src="https://mangafy.club/img/commisionList.webp"
                        alt=""
                      />,
                    ]}
                  />
                </div>
              )}
              {!pricingList.length && id === user?._id && !editMode && (
                <div className={styles.noContent}>
                  <Card
                    description="It's time to tell about your services. <br/> Let's start!"
                    btnText="Let's start"
                    onClick={() => setEditMode(true)}
                    items={[
                      <Imgix
                        key="1"
                        width={124}
                        height={140}
                        layout="fixed"
                        src="https://mangafy.club/img/commisionList.webp"
                        alt=""
                      />,
                    ]}
                  />
                </div>
              )}
              {pricingList.map((field, index) => (
                <Space
                  className={'col-lg-12'}
                  key={field.key}
                  style={{ display: 'flex', position: 'relative', marginBottom: 15 }}
                  align="start">
                  <span className={styles.grupe}>
                    <Input
                      className={cn(
                        styles.inputService,
                        !field.first && canEdit && editMode && isSubmitted && styles.errInp
                      )}
                      disabled={!(canEdit && editMode)}
                      placeholder="Service"
                      name="first"
                      data-id={index}
                      value={field.first}
                      onChange={handleChange}
                    />
                    {!field.first && canEdit && editMode && isSubmitted && (
                      <span className={styles.errMessage}> Field is require </span>
                    )}
                  </span>
                  <span className={cn(styles.grupe)}>
                    <Input
                      className={cn(
                        styles.inputCost,
                        !field.last && canEdit && editMode && isSubmitted && styles.errInp
                      )}
                      disabled={!(canEdit && editMode)}
                      placeholder="Cost"
                      name="last"
                      data-id={index}
                      value={field.last}
                      onChange={handleChange}
                    />
                    {!field.last && canEdit && editMode && isSubmitted && (
                      <span className={cn(styles.errMessage, styles.ml)}> Field is require </span>
                    )}
                  </span>
                  <div className={styles.close}>
                    {editMode && canEdit && (
                      <MinusCircleOutlined
                        style={{ 'margin-left': '11px' }}
                        onClick={() => {
                          setSubmitted(false);
                          remove(index);
                        }}
                      />
                    )}
                  </div>
                </Space>
              ))}
              {editMode && canEdit && (
                <div className={styles.addService}>
                  <Button
                    className={styles.addBtn}
                    type="dashed"
                    onClick={() => {
                      setAddMore(true);
                      add();
                    }}
                    block>
                    Add more
                  </Button>
                  <Button
                    className={styles.saveBtn}
                    onClick={
                      inputValue
                        ? () => {
                            // if input is not a empty
                            setPricing(pricingList);
                          }
                        : () => {
                            setSubmitted(addMore);
                          }
                    }
                    htmlType="submit">
                    Save
                  </Button>
                  {errMessage && <p>{errMessage}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommissionPricing.propTypes = {
  user: PropTypes.object,
  id: PropTypes.string,
};

CommissionPricing.defaultProps = {
  id: null,
  user: null,
};
