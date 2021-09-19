import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/*' render={(props) => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
