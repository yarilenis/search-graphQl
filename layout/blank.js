// import from libs
import React, { Component } from 'react';

// import layout
import Base from './base';

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
          <Comp {...this.props} />
        </div>
      );
    }
  }
  return Base(Layout);
};

export default PageWrapper;
