import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import Settings from './pages/dashboard/Settings';
import { elapsedTimeStr } from './services/utils';
import CreateProject from './pages/dashboard/CreateProject';
import ViewProject from './pages/dashboard/ViewProject';
import MyProjects from './pages/dashboard/MyProjects';

function App(props) {
  const [user, setUser] = useState({
    auth: false,
    role: '',
    user_id: '',
    user_name: '',
    last_login: '',
  });

  const changeUser = (currentUser) => {
    setUser(currentUser);
  };

  const [notifications, setNotifications] = useState(0);
  const [headers, setHeaders] = useState(HEADERS_DATA.home);

  useEffect(() => {
    let localUserData = localStorage.getItem('user');
    if (localUserData) {
      let userProfile = JSON.parse(localUserData);
      const minutes = elapsedTimeStr(userProfile.last_login, false);
      if (minutes > 720) {
        changeUser({
          auth: false,
          role: '',
          user_id: '',
          user_name: '',
          last_login: '',
        });
        localStorage.removeItem('user');
      } else {
        changeUser(userProfile);
      }
    }
  }, []);

  const changeNotifications = (count) => {
    setNotifications(count);
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
              <LogIn {...props} user={user} changeUser={changeUser} />
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
                  changeHeaders={changeHeaders}
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
            path='/createproject'
            render={(props) =>
              user.auth ? (
                <CreateProject {...props} user={user} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/myprojects'
            render={(props) =>
              user.auth ? (
                <MyProjects {...props} user={user} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/viewproject'
            render={(props) =>
              user.auth ? (
                <ViewProject {...props} user={user} />
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
            path='/accountsettings'
            render={(props) =>
              user.auth ? (
                <Settings {...props} user={user} />
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
