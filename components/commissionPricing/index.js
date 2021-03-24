import React, { useState, useEffect } from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Button, Space } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Card from 'components/card';
import SvgPurplePencil from 'components/icon/PurplePencil';
import PrimaryButton from 'components/ui-elements/button';
import { EVENTS } from 'helpers/amplitudeEvents';

import styles from './styles.module.scss';

const Amplitude = require('amplitude');

const amplitude = new Amplitude('3403aeb56e840aee5ae422a61c1f3044');

export const CommissionPricing = ({ id = null, user = null }) => {
  const [pricingList, setPricingList] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
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
  };

  useEffect(() => {
    getPricing();
  }, []);

  const handleChange = ({ target, currentTarget }) => {
    const newList = [...pricingList];
    const { id } = currentTarget.dataset;
    const { value, name } = target;
    newList[id][name] = value;
    setPricingList(newList);
  };

  const add = (index) => {
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
        {/* <div className="languages_btn"> */}
        {canEdit &&
          (!editMode ? (
            <SvgPurplePencil
              className={styles.editAboutButton}
              onClick={() => setEditMode(true)}
              width="30"
            />
          ) : (
            <div className={cn('buttonsProfile_styles', styles.commissionButton_save)}>
              <PrimaryButton
                className="buttonsProfile_save"
                text="save"
                onClick={() => setPricing(pricingList)}
                type="primary"
                htmlType="submit"
                isActive
                isRound
                disabled={false}
              />
              {/* <Button onClick={() => setPricing(pricingList)} type="primary" htmlType="submit">
                Save
              </Button> */}
            </div>
          ))}
      </div>
      {/* </div> */}
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
                    items={[<img key="1" src="/img/commisionList.png" alt="" />]}
                  />
                </div>
              )}
              {!pricingList.length && id === user?._id && !editMode && (
                <div className={styles.noContent}>
                  <Card
                    description="It's time to tell about your services. <br/> Let's start!"
                    btnText="Let's start"
                    onClick={() => setEditMode(true)}
                    items={[<img key="1" src="/img/commisionList.png" alt="" />]}
                  />
                </div>
              )}
              {pricingList.map((field, index) => (
                <Space
                  className="col-lg-12"
                  key={field.key}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}
                  align="start">
                  <Input
                    className={styles.inputService}
                    disabled={!(canEdit && editMode)}
                    placeholder="Service"
                    name="first"
                    data-id={index}
                    value={field.first}
                    onChange={handleChange}
                  />
                  <Input
                    className={styles.inputCost}
                    disabled={!(canEdit && editMode)}
                    placeholder="Cost"
                    name="last"
                    data-id={index}
                    value={field.last}
                    onChange={handleChange}
                  />
                  <div className={styles.close}>
                    {editMode && canEdit && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    )}
                  </div>
                </Space>
              ))}
              {editMode && canEdit && (
                <>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined /> Add more services
                  </Button>
                  <Space style={{ display: 'flex', marginTop: 8 }}>
                    {/* <Button onClick={() => setPricing(pricingList)} type="primary" htmlType="submit">
                  Save
              </Button> */}
                    {errMessage && <p>{errMessage}</p>}
                  </Space>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
