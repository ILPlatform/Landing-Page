import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Context } from '../Context';

const Translate = ({ match: { path } }) => {
  const dispatch = useContext(Context)[1];
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: 'SET_LANGUAGE', payload: path.replaceAll('/', '') });
    history.push('/');
  }, [dispatch, path, history]);

  return <></>;
};

export default Translate;
