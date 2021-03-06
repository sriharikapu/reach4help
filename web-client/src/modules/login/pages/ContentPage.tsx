import get from 'lodash/get';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import { LoginLocation } from './routes/LoginRoute/constants';
import LoginRoute from './routes/LoginRoute/LoginRoute';

const ContentPage = (): ReactElement => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
  const loading: firebase.User = useSelector(
    (state: AppState) => state.auth.loading,
  );
  const dispatch = useDispatch();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  const location = useLocation();
  const redirectBack = get(location, 'state.redirectBack') || '/';

  if (loading && !user) {
    return <>Loading</>;
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: redirectBack,
        }}
      />
    );
  }
  return (
    <Switch>
      <Route path={LoginLocation.path} component={LoginRoute} exact />
      <Route path="*" component={NotFoundRoute} />
    </Switch>
  );
};

export default ContentPage;
