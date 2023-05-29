import React from 'react';
import MainForm from '../components/MainForm/MainForm';
import { observer } from 'mobx-react';

const Auth = observer(() => {
  return (
    <>
      <MainForm />
    </>
  );
});

export default Auth;
