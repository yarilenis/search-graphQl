// import from libs
import React, { Component } from 'react';

// import layout
import Base from './base';

// import components
import Header from './default/header';
import Footer from './default/footer';

const PageWrapper = (Comp) => {
  class Layout extends Component {
    static async getInitialProps(args) {
      return {
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      return (
        <div>
          <Header />
          <Comp {...this.props} />
          <Footer />
        </div>
      );
    }
  }
  return Base(Layout);
};

export default PageWrapper;
