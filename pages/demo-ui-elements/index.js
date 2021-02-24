import React from 'react';

import PrimaryUpload from 'components/ui-elements/upload';

import SvgAdd from '../../components/icon/Add';
import AddButton from '../../components/ui-elements/add-button';
import PrimaryButton from '../../components/ui-elements/button';
import HugeButton from '../../components/ui-elements/huge-button';
import PrimaryInput from '../../components/ui-elements/input';
import LargeButton from '../../components/ui-elements/large-button';
import Search from '../../components/ui-elements/search';

const UIElements = () => (
  <>
    <main>
      <div className={'container'}>
        <div className="demo_ui_elements">
          <PrimaryUpload />
        </div>
        <div className="demo_ui_elements">
          <Search
            placeholder="Head - Sketch"
            defaultValue="Head - Sketch"
            onClick={() => alert('search')}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryInput placeholder="Head - Sketch" defaultValue="Head - Sketch" />
        </div>
        <div className="demo_ui_elements">
          <PrimaryInput placeholder="Head - Sketch" defaultValue="Head - Sketch" isLinear={true} />
        </div>
        <div className="demo_ui_elements">
          <PrimaryInput placeholder="5" defaultValue="20" isSmall={true} />
        </div>
        <div className="demo_ui_elements">
          <AddButton onClick={() => alert('add')} />
          <AddButton isDark={true} onClick={() => alert('add')} />
          <AddButton isActive={true} onClick={() => alert('add')} />
        </div>
        <div className="demo_ui_elements">
          <HugeButton
            text="Post Collaborations"
            disabled={false}
            onClick={() => alert('HugeButton')}
          />
        </div>
        <div className="demo_ui_elements">
          <LargeButton
            text="SIGN UP for FREE"
            disabled={false}
            onClick={() => alert('large_primary_button')}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="Submit an IDEA"
            disabled={false}
            onClick={() => alert('primary_button')}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="Join me on my journey"
            disabled={false}
            onClick={() => alert('primary_button')}
            splitterStyle={{
              fontSize: '15px',
              minWidth: '215px',
            }}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="Back this project"
            isDark={true}
            onClick={() => alert('dark_primary_button')}
            splitterStyle={{
              fontSize: '15px',
              minWidth: '215px',
            }}
          />
        </div>

        <div className="demo_ui_elements">
          <PrimaryButton
            text="Add new field"
            isActive={true}
            suffix={<SvgAdd width="25px" height="25px" />}
            onClick={() => alert('active_primary_button')}
            splitterStyle={{
              fontSize: '15px',
            }}
          />
        </div>

        <div className="demo_ui_elements">
          <PrimaryButton
            text="next 2"
            onClick={() => alert('dark_primary_button')}
            splitterStyle={{
              fontSize: '15px',
            }}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="page 2"
            isActive={true}
            onClick={() => alert('dark_primary_button')}
            splitterStyle={{
              fontSize: '15px',
            }}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="Add new field"
            isPlump={true}
            items={[
              <img src="/img/user_online.png" alt="" />,
              <img src="/img/user_online.png" alt="" />,
              <img src="/img/user_online.png" alt="" />,
              <img src="/img/user_online.png" alt="" />,
            ]}
            onClick={() => alert('active_primary_button')}
            suffix={<SvgAdd width="25px" height="25px" />}
            splitterStyle={{
              fontSize: '15px',
            }}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="Add a task"
            isPlump={true}
            isActive={true}
            suffix={<SvgAdd width="25px" height="25px" />}
            onClick={() => alert('active_primary_button')}
            splitterStyle={{
              fontSize: '15px',
            }}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="next 2"
            isRound={true}
            disabled={false}
            onClick={() => alert('primary_button')}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="save"
            isActive={true}
            isRound={true}
            disabled={false}
            onClick={() => alert('primary_button')}
          />
        </div>
        <div className="demo_ui_elements">
          <PrimaryButton
            text="back"
            isDark={true}
            isRound={true}
            disabled={false}
            onClick={() => alert('primary_button')}
          />
        </div>
      </div>
    </main>
  </>
);

export default UIElements;
