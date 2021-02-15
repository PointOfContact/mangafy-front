import React, { Component } from 'react';

import Head from 'next/head';

class Verify extends Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    import('api/restClient').then((m) => {
      m.default
        .service('/api/v2/authManagement')
        .create(
          {
            value: token,
            action: 'verifySignupLong',
            notifierOptions: {}, // options passed to options.notifier, e.g. {preferredComm: 'email'}
          },
          {
            mode: 'no-cors',
          }
        )
        .then((res) => {
          setMessage('Your account has verified');
          setTimeout(() => {
            Router.push({
              pathname: `/sign-in`,
              query: {},
            });
          }, 1000);
        })
        .catch((err) => {
          // setMessage(err.message)
        });
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>MangaFY Verify</title>
          <meta name="description" content="MangaFY Verify"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 id="info" style={{ color: 'green' }}>
          {/* {message} */}
        </h1>
      </>
    );
  }
}
export default Verify;
