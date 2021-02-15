import React, { Component } from 'react';

import MobileVersion from './mobileMenu';

const Loading = () => (
  <div className="loading">
    <img style={{ width: '90%' }} src="../img/logo.png" alt="logo" />
  </div>
);

class MobilePage extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.isLoading = setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.isLoading);
  }

  timer = () =>
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);

  render() {
    const { loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div className="mobile_version">
        <MobileVersion />
      </div>
    );
  }
}

export default MobilePage;
