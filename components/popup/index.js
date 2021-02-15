import React, { useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Radio, Select, Slider } from 'antd';
import { COUNTRIES, userTypes } from 'helpers/constant';

const { Option } = Select;

const EditPopup = ({ fieldName, onChange, closePopup, save, saveClose, baseData }) => {
  if (!baseData) {
    return null;
  }

  const [showField, setShowField] = useState(true);
  const value = baseData[fieldName];
  const filteredOptions =
    fieldName === 'preferredLanguage' ? COUNTRIES.filter((o) => !value.includes(o)) : [];
  let field = null;
  const rangeValue = baseData.price || 1;
  const toggleFieldRange = (isVisible) => {
    setShowField(isVisible);
  };

  const marks = {
    1: {
      style: {
        color: '#0070f3',
      },
      label: <strong>1$</strong>,
    },
    1000: {
      style: {
        color: '#0070f3',
      },
      label: <strong>1000$</strong>,
    },
  };

  if (showField) {
    field = (
      <div className="fieldCard">
        <Slider
          marks={marks}
          defaultValue={rangeValue}
          onChange={onChange}
          max={1000}
          tooltipVisible
        />
      </div>
    );
  }
  return (
    <div className="main-popup bg-white">
      <div className="row row-popup">
        <span className="closePopup text-dark" onClick={closePopup}>
          <CloseOutlined />
        </span>
        <div className="modal-content">
          {fieldName === 'preferredLanguage' && (
            <div className="languageEdit" id="preferredLanguage">
              <div className="logo_img_comp">
                <img src="/img/logo.png" width="250" alt="" />
              </div>
              <h1 className="collab">
                Towards more effective communication. What language do you speak?
              </h1>
              <Select
                placeholder="Inserted are removed"
                defaultValue={value}
                onChange={onChange}
                style={{ width: '100%' }}
                name={fieldName}
                showSearch
                getPopupContainer={() => document.getElementById('preferredLanguage')}>
                {filteredOptions.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          {fieldName === 'searchingFor' && (
            <div className="searchingFor">
              <h1 className="collab form_header_title">Who I want to Collaborate with?</h1>
              <p className="title_text">
                MangaFY believes that even aspiring artists can make the next big comic or graphic
                novel, and the journey should not be a solo act but a joint collaboration.
              </p>
              <div style={{ width: '100%' }}>
                <div className="row">
                  <ul className="collaboratChooseEdit">
                    {userTypes.map((item, index) => (
                      <li>
                        <Checkbox
                          checked={baseData[fieldName].includes(item.key)}
                          onClick={onChange}
                          name="searchingFor"
                          value={item.key}
                          key={item.key}>
                          {item.value}
                        </Checkbox>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="choose_text">Choose as many as you like</p>
              </div>
            </div>
          )}

          {fieldName === 'compensationModel' && (
            <div className="compensation">
              <div className="logo_img_comp">
                <img src="/img/logo.png" width="250" alt="" />
              </div>
              <h1 className="collab">Сollab type</h1>
              <Radio.Group
                value={value}
                defaultValue="notPaid"
                name="compensation"
                onChange={onChange}>
                <div className="row">
                  <div className="col-lg-12">
                    <Radio
                      value="paid"
                      onClick={() => {
                        toggleFieldRange(true);
                      }}>
                      I'm ready to pay for tasks
                    </Radio>
                  </div>
                  <div className="col-lg-12">
                    <Radio
                      value="collaboration"
                      onClick={() => {
                        toggleFieldRange(false);
                      }}>
                      I'm looking for mutually beneficial
                    </Radio>
                  </div>
                </div>
                <div>{field}</div>
              </Radio.Group>
            </div>
          )}
          <div className="modal-footer">
            <Button type="text" onClick={save}>
              Save
            </Button>
            <Button type="primary" onClick={saveClose}>
              Save and Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
