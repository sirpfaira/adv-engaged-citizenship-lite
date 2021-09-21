import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import Dashboard from './pages/dashboard/Dashboard';
import AllNotifications from './pages/dashboard/AllNotifications';
import Profile from './pages/dashboard/Profile';
import EditProfile from './pages/dashboard/EditProfile';

function App(props) {
  const [user, setUser] = useState({
    auth: false,
    type: '',
    userId: '',
  });

  const [notifications, setNotifications] = useState(3);

  const changeNotifications = (count) => {
    setNotifications(count);
  };

  const changeUser = (currentUser) => {
    setUser(currentUser);
  };

  return (
    <>
      <BrowserRouter>
        <Header
          user={user}
          changeUser={changeUser}
          notifications={notifications}
          changeNotifications={changeNotifications}
        />
        <Switch>
          <Route
            path='/login'
            render={(props) => <LogIn {...props} changeUser={changeUser} />}
          />
          <Route
            path='/dashboard'
            render={(props) =>
              user.auth ? (
                <Dashboard {...props} user={user} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/allnotifications'
            render={(props) =>
              user.auth ? (
                <AllNotifications {...props} user={user} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/myprofile'
            render={(props) =>
              user.auth ? (
                <Profile {...props} user={user} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/editprofile'
            render={(props) =>
              user.auth ? (
                <EditProfile {...props} user={user} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route path='/*' render={(props) => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
