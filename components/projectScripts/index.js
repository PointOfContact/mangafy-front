import React, { useEffect, useState } from 'react';

import { Form } from 'antd';
import cn from 'classnames';
import SvgDustbin from 'components/icon/Dustbin';
import Popconfirm from 'components/popconfirm';
import AddButton from 'components/ui-elements/add-button';
import PrimaryInput from 'components/ui-elements/input';
import TextArea from 'components/ui-elements/text-area';
import useWindowSize from 'utils/useWindowSize';

import styles from './styles.module.scss';
import { patchPage, createPage, deletePage } from 'api/storyBoardClient';

const ProjectScripts = ({ pages, storyBoardId }) => {
  const { width } = useWindowSize();
  const [scripts, setScripts] = useState(pages);

  const [selectedScript, setSelectedScript] = useState(scripts[0]?._id);
  
  useEffect(() => {
    const newScripts =  [
      ...pages,
      {
        _id: Math.floor(Math.random() * 1000000),
        newCreated: true,
        title: '',
        text: '',
      }, {
        _id: Math.floor(Math.random() * 1000000),
        newCreated: true,
        title: '',
        text: '',
      }
    ];
    setScripts(newScripts);
  }, []);

  const cahangeSelectedScriot = (index, id) => {
    if (index !== scripts.length) setSelectedScript(id);
  };

  const confirm = (index) => {
    removeScript(index);
  };

  const removeScript = (index) => {
    deletePage(scripts[index]._id, (res) => {}, (err) => {})
    const items = [...scripts];
    items.splice(index, 1);
    setScripts(items);
  };

  const updateScripts = (value, index, feild) => {
    const items = [...scripts];
    if (feild === 'title') {
      items[index].title = value;
    }
    if (feild === 'text') {
      items[index].text = value;
    }
    if(items[index].title) {
      const dataToSave = {
        ...items[index]
      };
      delete dataToSave?._id;
      if(items[index].newCreated) {
        delete items[index]?.newCreated;
        delete dataToSave?.newCreated;
        dataToSave.order = index + 1;
        dataToSave.storyBoard = storyBoardId;

        createPage(dataToSave, (res) => {
          items[index]._id = res?._id;
          setScripts(items);
        }, (err) => {})
      } else {
        patchPage(items[index]?._id, dataToSave, (res) => {}, (err) => {});
      }
    }
    if (items[items.length - 2].title) {
      items.push({
        _id: Math.floor(Math.random() * 1000000),
        newCreated: true,
        title: '',
        text: '',
      });
    }
    setScripts(items);
  };
  return (
    <div className={styles.projectScripts}>
      {scripts.map((script, index) => (
        <div
          key={script._id}
          className={cn(
            selectedScript === script._id && styles.active_script,
            styles.script,
            index + 1 === scripts.length && styles.disabled
          )}
          onClick={() => cahangeSelectedScriot(index + 1, script._id)}>
          <div className={styles.content}>
            <div className={styles.text}>
              {(selectedScript === script._id && (
                <>
                  <h4 className={styles.title}>{`page #${index + 1}`}</h4>
                  <Form
                    name="basic"
                    initialValues={{ title: script.title, text: script.text }}>
                    <Form.Item name="title">
                      <PrimaryInput
                        onBlur={(e) => updateScripts(e.target.value, index, 'title')}
                        placeholder="Page title"
                      />
                    </Form.Item>
                    <Form.Item name="text">
                      <TextArea
                        onBlur={(e) => updateScripts(e.target.value, index, 'text')}
                        placeholder="Page description"
                        minRows={width < 768 ? 5 : 12}
                        maxRows={width < 768 ? 6 : 15}
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
                  <p className={styles.description}>{script.text || ''}</p>
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
