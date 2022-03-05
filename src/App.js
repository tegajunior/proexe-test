import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';


import MainHeader from './components/Layout/MainHeader';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import EditUser from './pages/EditUser';



function App() {
  return (
    <Fragment>
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
