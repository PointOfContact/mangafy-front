import React, { useState } from 'react';

import { Form } from 'antd';
import cn from 'classnames';
import SvgDustbin from 'components/icon/Dustbin';
import Popconfirm from 'components/popconfirm';
import AddButton from 'components/ui-elements/add-button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import useWindowSize from 'utils/useWindowSize';

import styles from './styles.module.scss';

const ProjectScripts = () => {
  const { width } = useWindowSize();
  const [scripts, setScripts] = useState([
    {
      key: Math.floor(Math.random() * 1000000),
      title: 'bbbbbbb',
      description: 'aaaaaaaaa',
    },
    {
      key: Math.floor(Math.random() * 1000000),
      title: '',
      description: '',
    },
    {
      key: Math.floor(Math.random() * 1000000),
      title: '',
      description: '',
    },
  ]);

  const [selectedScript, setSelectedScript] = useState(scripts[0]?.key);

  const cahangeSelectedScriot = (index, key) => {
    if (index !== scripts.length) setSelectedScript(key);
  };

  const confirm = (index) => {
    removeScript(index);
  };

  const removeScript = (index) => {
    const items = [...scripts];
    items.splice(index, 1);
    setScripts(items);
  };

  const updateScripts = (value, index, feild) => {
    const items = [...scripts];
    if (feild === 'title') {
      items[index].title = value;
    }
    if (feild === 'description') {
      items[index].description = value;
    }
    if (items[items.length - 2].title) {
      items.push({
        key: Math.floor(Math.random() * 1000000),
        title: '',
        description: '',
      });
    }
    setScripts(items);
  };
  return (
    <div className={styles.projectScripts}>
      {scripts.map((script, index) => (
        <div
          key={script.key}
          className={cn(
            selectedScript === script.key && styles.active_script,
            styles.script,
            index + 1 === scripts.length && styles.disabled
          )}
          onClick={() => cahangeSelectedScriot(index + 1, script.key)}>
          <div className={styles.content}>
            <div className={styles.text}>
              {(selectedScript === script.key && (
                <>
                  <h4 className={styles.title}>{`page #${index + 1}`}</h4>
                  <Form
                    name="basic"
                    initialValues={{ title: script.title, description: script.description }}>
                    <Form.Item name="title">
                      <PrimaryInput
                        onBlur={(e) => updateScripts(e.target.value, index, 'title')}
                        placeholder="Page title"
                      />
                    </Form.Item>
                    <Form.Item name="description">
                      <TextArea
                        onBlur={(e) => updateScripts(e.target.value, index, 'description')}
                        placeholder="Page description"
                        minRows={(width < 768 && 5) || 12}
                        maxRows={(width < 768 && 6) || 15}
                      />
                    </Form.Item>
                  </Form>
                </>
              )) || (
                <>
                  {script.title && <h4 className={styles.title}>{`page #${index + 1}`}</h4>}
                  {!script.title && (
                    <h4 className={styles.title}>
                      <AddButton />
                    </h4>
                  )}
                  <h4 className={styles.title}>{script.title || `Add page #${index + 1}`}</h4>
                  <p className={styles.description}>{script.description || ''}</p>
                </>
              )}
            </div>
            {scripts.length - 3 === index && (
              <Popconfirm
                title="Are you sure to delete this script"
                onConfirm={() => confirm(index)}
                item={
                  <span className={styles.delete}>
                    <SvgDustbin width="22px" height="22px" />
                  </span>
                }
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectScripts;
