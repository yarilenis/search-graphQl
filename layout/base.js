// import from libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { appUrl } from '../config';

const defaultTitle = 'Buscador de Trabajos';
const defaultDescription = 'Buscador de Trabajos en GraphQl';
const defaultTwitterImage = 'https://cdn.joinnus.com/files/share-twitter.jpg';
const defaultFacebookImage = 'https://cdn.joinnus.com/files/share-facebook.jpg';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  twitterImage: PropTypes.string,
  facebookImage: PropTypes.string,
  noIndex: PropTypes.any,
  prevLink: PropTypes.any,
  nextLink: PropTypes.any,
  canonicalUrl: PropTypes.any,
};

const defaultProps = {
  title: defaultTitle,
  description: defaultDescription,
  twitterImage: defaultTwitterImage,
  facebookImage: defaultFacebookImage,
  noIndex: false,
  prevLink: false,
  nextLink: false,
  canonicalUrl: false,
};

const PageWrapper = (Comp) => {
  class Layout extends Component {
    static async getInitialProps(args) {
      return {
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      const {
        title,
        description,
        twitterImage,
        facebookImage,
        noIndex,
        prevLink,
        nextLink,
        canonicalUrl,
      } = this.props;
      const indexText = noIndex ? 'noindex' : 'index';
      return (
        <div>
          <Head>
            <title>{ title }</title>
            <meta name="description" content={description} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@joinnus" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content="@joinnus" />
            <meta name="twitter:image" content={twitterImage} />

            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.joinnus.com/" />
            <meta property="og:image" content={facebookImage} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="Joinnus.com" />
            <meta property="fb:admins" content="465516883516823" />

            <meta name="robots" content={`${indexText}, follow`} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            {prevLink && <link rel="prev" href={appUrl + prevLink} />}
            {nextLink && <link rel="next" href={appUrl + nextLink} />}
          </Head>
          <Comp {...this.props} />
        </div>
      );
    }
  }

  Layout.propTypes = propTypes;

  Layout.defaultProps = defaultProps;

  return Layout;
};

export default PageWrapper;
