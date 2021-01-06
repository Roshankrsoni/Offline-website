import './App.css';
import IndexPage from './pages';
import Details from "./pages/details";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router >
      <Route exact path={'/'} >
        <IndexPage />
      </Route>
      <Route path={'/todos/:id'} >
        <Details />
      </Route>
    </Router>
  );
}

export default App;
