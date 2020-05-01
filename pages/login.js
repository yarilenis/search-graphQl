// Import from libs
import React from 'react';
import { connect } from 'react-redux';

// import config libs
import initStore from '../store';

// import components
import LayoutWrapper from '../layout/default';
import LoginForm from '../components/LoginForm';

// declare consts
const propTypes = {};

class Login extends React.Component {
  getInitialProps = async () => {}

  render() {
    return (
      <section style={{ minHeight: 'calc(100vh - 121px)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = propTypes;
const LoginW = LayoutWrapper(Login);

export default connect(initStore)(LoginW);
