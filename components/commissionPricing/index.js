import React, { useState, useEffect } from 'react';

import { Input, Space } from 'antd';
import client from 'api/client';
import cn from 'classnames';
import Card from 'components/card';
import SvgClose from 'components/icon/Close';
import Imgix from 'components/imgix';
import AddButton from 'components/ui-elements/add-button';
import { EVENTS } from 'helpers/amplitudeEvents';
import PropTypes from 'prop-types';
import myAmplitude from 'utils/amplitude';

import styles from './styles.module.scss';

export const CommissionPricing = ({ id, user }) => {
  const [pricingList, setPricingList] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState(true);
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

  const setPricing = (newList) => {
    const empti = newList.find((item) => item.first === '' || item.last === '');
    if (!empti) {
      const jwt = client.getCookie('feathers-jwt');
      import('api/restClient').then((m) => {
        m.default
          .service('/api/v2/users')
          .patch(
            id,
            { pricingTable: newList },
            {
              headers: { Authorization: `Bearer ${jwt}` },
              mode: 'no-cors',
            }
          )
          .then((res) => {
            const data = [
              {
                event_type: EVENTS.COMMISION_SAVE,
                event_properties: { pricingTable: res.pricingTable },
              },
            ];
            setErrMessage('');
            myAmplitude(data);
            setPricingList(res.pricingTable);
            setEditMode(false);
          })
          .catch((err) => {
            setErrMessage(err.message);
            return err;
          });
      });
    } else {
      setErrMessage('Please complete both fields before submitting');
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
    setInputValue(!!target.defaultValue.length + 1);
  };

  const add = () => {
    const data = [
      {
        event_type: EVENTS.COMMISION_CREATED,
        event_properties: { method: 'add' },
      },
    ];
    myAmplitude(data);
    const newList = [...pricingList, { first: '', last: '' }];
    setPricingList(newList);
  };

  const remove = (position) => {
    const data = [
      {
        event_type: EVENTS.COMMISION_DELETE,
        event_properties: { method: 'delete', item: pricingList[position] },
      },
    ];
    myAmplitude(data);
    const newList = pricingList.filter((item, index) => index !== position);
    setPricingList(newList);
    setPricing(newList);
  };

  const sendEvent = (index, type) => {
    const data = [
      {
        event_type: EVENTS.COMMISION_EDIT,
        event_properties: { method: 'edit', type, item: pricingList[index] },
      },
    ];
    myAmplitude(data);
  };

  return (
    <div className={`title d-flex`}>
      <div className="buttons change_btn_commission col-lg-12"></div>
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
                        alt="MangaFy commission"
                      />,
                    ]}
                  />
                </div>
              )}
              {/* {!pricingList.length && id === user?._id && !editMode && (
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
                        alt="MangaFy commission"
                      />,
                    ]}
                  />
                </div>
              )} */}
              <div className={styles.title}>
                <p>What services do you provide</p>
                <p>Price</p>
              </div>
              {pricingList.map((field, index) => (
                <>
                  <Space
                    className={'col-lg-12'}
                    key={field.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      marginBottom: 15,
                    }}
                    align="start">
                    <span className={styles.grupe}>
                      <Input
                        className={cn(
                          styles.inputService,
                          !field.first && canEdit && editMode && isSubmitted && styles.errInp
                        )}
                        placeholder="Drawing, writing, or translating"
                        name="first"
                        data-id={index}
                        value={field.first}
                        onBlur={() => {
                          sendEvent(index, 'text');
                          inputValue ? setPricing(pricingList) : setSubmitted(addMore);
                        }}
                        onChange={handleChange}
                      />
                      {!field.first && canEdit && editMode && isSubmitted && (
                        <span className={styles.errMessage}>{} Field is require </span>
                      )}
                    </span>
                    <span className={cn(styles.grupe)}>
                      <Input
                        className={cn(
                          !field.last && canEdit && editMode && isSubmitted && styles.errInp,
                          styles.price
                        )}
                        placeholder="Commission price"
                        name="last"
                        data-id={index}
                        value={field.last}
                        onBlur={() => {
                          sendEvent(index, 'price');
                          inputValue ? setPricing(pricingList) : setSubmitted(addMore);
                        }}
                        onChange={handleChange}
                      />
                      {!field.last && !field.first && canEdit && editMode && isSubmitted && (
                        <span className={cn(styles.errMessage, styles.ml)}> Field is require </span>
                      )}
                    </span>
                    <div className={styles.close}>
                      <SvgClose
                        width="19"
                        height="19"
                        onClick={() => {
                          setInputValue(true);
                          setSubmitted(false);
                          remove(index);
                        }}
                      />
                    </div>
                  </Space>
                </>
              ))}
              {errMessage && <p className={styles.error}>{errMessage}</p>}
              {/* {editMode && canEdit && (
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
              )} */}
              <AddButton
                width="25px"
                height="25px"
                onClick={() => {
                  setAddMore(true);
                  add();
                }}
                className={styles.addCommission}
                text={'Add commission'}
              />
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
