import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Notification from './components/UI/Notification';
import MainHeader from './components/Layout/MainHeader';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import EditUser from './pages/EditUser';



function App() {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <MainHeader />

      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/user" exact>
            <AddNew />
          </Route>
          <Route path="/user/:userId">
            <EditUser />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
