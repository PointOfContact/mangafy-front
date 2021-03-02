import { Modal, notification, Select } from 'antd';
import client from 'api/client';
import Router from 'next/router';

const types = [
  {
    label: 'Writer',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Penciler',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Inker',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Colorist',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Letterer',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Сover artist',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Character Designer',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Key Translator',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Publisher',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Editor',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Backers',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
  {
    label: 'Mentorship',
    description: 'lorem  lorem   lorem',
    checked: false,
  },
];

const ModalTitle = <div className="modalTitle"></div>;
const { Option, OptGroup } = Select;

class ModalStart extends React.Component {
  state = { visible: false, joinAs: 'Writer' };

  showModal = () => {
    this.props.user
      ? this.setState({
          visible: true,
        })
      : Router.push('/sign-in');
  };

  handleChange(e) {
    this.setState({ joinAs: e.target.options[e.target.selectedIndex].text });
  }

  handleChangeText(e) {
    this.setState({ text: e.target.value });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  createRequest = (_) => {
    const jwt = client.getCookie('feathers-jwt');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/join-manga-story-requests')
        .create(
          {
            mangaStoryId: this.props.pid,
            joinAs: this.state.joinAs,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )
        .then((response) =>
          m.default.service('/api/v2/conversations').create(
            {
              joinMangaStoryRequestId: response._id,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
        )
        .then((response) =>
          m.default.service('/api/v2/messages').create(
            {
              content: this.state.text || 'Hi',
              conversationId: response._id,
            },
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          )
        )
        .then((response) => {
          this.setState({
            visible: false,
          });
        })
        .catch((err) => this.openNotification('error', err.message));
    });
  };

  render() {
    return (
      <div>
        {!this.props.isOwn ? (
          <button
            className="but-manga-story mt-3 mb-3"
            id="modalJoinMyJourneyBtnId"
            onClick={this.showModal}>
            Join me on my journey
          </button>
        ) : null}

        <Modal
          className=""
          title={ModalTitle}
          style={{ width: '900px' }}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 select_modal">
                <form action="">
                  <h2>Join as</h2>
                  <select
                    defaultValue="Writer"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}>
                    {types.map((type) => (
                      <option value={type.label}>{type.label}</option>
                    ))}
                  </select>
                  <h2>Your message</h2>
                  <textarea
                    onChange={(e) => {
                      this.handleChangeText(e);
                    }}
                    name=""
                    id=""
                    placeholder="Start writing :)"></textarea>
                  <div className="modal_select_btn">
                    <button
                      id="modalJoinMyJourneySubmitBtnId"
                      onClick={() => {
                        this.createRequest();
                      }}>
                      Join me on my journey
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default ModalStart;
