import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import Register from './pages/login/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AllNotifications from './pages/dashboard/AllNotifications';
import Profile from './pages/dashboard/Profile';
import EditProfile from './pages/dashboard/EditProfile';
import HEADERS_DATA from './components/headers_data';
import ImageUpload from './pages/dashboard/ImageUpload';

function App(props) {
  const [user, setUser] = useState({
    auth: false,
    role: '',
    userId: '',
  });

  const [notifications, setNotifications] = useState(0);
  const [headers, setHeaders] = useState(HEADERS_DATA.home);

  const changeNotifications = (count) => {
    setNotifications(count);
  };

  const changeUser = (currentUser) => {
    setUser(currentUser);
  };

  const changeHeaders = (currentHeaders) => {
    setHeaders(currentHeaders);
  };

  return (
    <>
      <BrowserRouter>
        <Header
          user={user}
          changeUser={changeUser}
          notifications={notifications}
          changeNotifications={changeNotifications}
          headers={headers}
          changeHeaders={changeHeaders}
        />
        <Switch>
          <Route
            path='/login'
            render={(props) => (
              <LogIn
                {...props}
                user={user}
                changeUser={changeUser}
                changeHeaders={changeHeaders}
              />
            )}
          />
          <Route
            path='/register'
            render={(props) => (
              <Register
                {...props}
                user={user}
                changeUser={changeUser}
                changeHeaders={changeHeaders}
              />
            )}
          />
          <Route
            path='/dashboard'
            render={(props) =>
              user.auth ? (
                <Dashboard
                  {...props}
                  user={user}
                  changeNotifications={changeNotifications}
                />
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
          <Route path='/upload' render={(props) => <ImageUpload />} />
          <Route
            path='/*'
            render={(props) => (
              <Home
                {...props}
                changeUser={changeUser}
                changeNotifications={changeNotifications}
                changeHeaders={changeHeaders}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
