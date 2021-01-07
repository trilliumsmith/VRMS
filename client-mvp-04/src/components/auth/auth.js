import React, { useState } from 'react';
import './auth.scss';
import Button from '../common/button/button';
import { checkAuth } from '../../services/user.service';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Auth = (props) => {
  const { user } = props;
  const [isMessageShow, setMessage] = useState(false);

  const handleButton = async () => {
    const isAuth = await checkAuth(user.email);
    if (isAuth) setMessage(true);

    setTimeout(() => {
      setMessage(false);
    }, 5000);
  };

  return user ? (
    <div className="flex-container auth">
      <div className="auth-content">
        Please verify your email via magic link in your inbox
      </div>

      <Button
        type={'text'}
        content={`Resend Link`}
        className={'btn-square auth-button'}
        onClick={() => handleButton()}
      />

      {isMessageShow ? (
        <div className="resend-link-msg">
          A new link has been sent to your email
        </div>
      ) : null}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Auth);
