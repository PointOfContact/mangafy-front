import React, { Component } from 'react';

import { NextSeo } from 'next-seo';
import Router from 'next/router';

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
          Router.push({
            pathname: `/`,
            query: {},
          });
          // setMessage(err.message)
        });
    });
  }

  render() {
    return (
      <>
        <NextSeo
          title="MangaFY Verify"
          description="MangaFY Verify"
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
          ]}
        />
        <h1 id="info" style={{ color: 'green' }}>
          {/* {message} */}
        </h1>
      </>
    );
  }
}
export default Verify;
