import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';

import initStore from '../store';
import { setCookie, setAuth } from '../store/actions/auth';

import '../scss/index.scss';

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      };
    }

    componentDidMount() {
      this.checkCookieLogin();
    }

    async checkCookieLogin() {
      const { getState, dispatch } = this.props.store;
      const { auth: { idCookie } } = getState();
      let ses = window.localStorage.getItem('ses');
      let token;

      if (ses) {
        ses = JSON.parse(ses);
        token = ses.token || idCookie;
      }

      if (token) {
        dispatch(setCookie(token));
        dispatch(setAuth({ loggedIn: true, user: ses.user }));
      }
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  },
);
