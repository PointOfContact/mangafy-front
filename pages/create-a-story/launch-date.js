import React, { Component } from 'react';

import { Button, DatePicker } from 'antd';
import SvgLeftArrow from 'components/icon/LeftArrow';
import SvgRightArrow from 'components/icon/RightArrow';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';

export default class Introduce extends Component {
  state = {
    fileList: [],
    uploading: false,
    loadings: [],
    selectedDate: new Date(),
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
  };

  enterLoading = (index) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
  };

  onChange = (date, dateString) => {
    this.setState({ selectedDate: dateString });
  };

  render() {
    const { loadings, selectedDate } = this.state;
    return (
      <>
        <Head></Head>
        <main>
          <div className="container">
            <div className="row collab_radio">
              <div className="col-lg-8">
                <div className="collab_div">
                  <div className="logo_img_comp">
                    <img src="/img/logo.png" width="250" alt="" />
                  </div>
                  <h1 className="collab">Target launch date (optional)</h1>
                  <br />
                  <DatePicker
                    className="date_picker"
                    value={moment(selectedDate)}
                    onChange={this.onChange}
                  />
                </div>
                <div className="next_prev">
                  <Link href="/create-a-story/image">
                    <Button id="launchDatePrevBtnId" className="title_but_prev">
                      <SvgLeftArrow width="13.503px" height="23.619px" />
                      <span> Previous</span>
                    </Button>
                  </Link>
                  <Link href="/create-a-story/publish">
                    <Button
                      id="launchDateNextBtnId"
                      type="primary"
                      className="title_but"
                      loading={loadings[0]}
                      onClick={() => this.enterLoading(0)}>
                      <span>Next</span>
                      <SvgRightArrow width="13.503px" height="23.619px" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  componentDidMount() {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    const date_picker = mangaData.date_picker || new Date();
    this.setState({
      selectedDate: date_picker,
    });
  }

  componentDidUpdate() {
    let mangaData = localStorage.getItem('mangaStory');
    mangaData = mangaData ? JSON.parse(mangaData) : {};
    mangaData.date_picker = this.state.selectedDate;
    localStorage.setItem('mangaStory', JSON.stringify(mangaData));
  }
}
