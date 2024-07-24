import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import FormCreation from "./components/FormCreation";
import FormFill from "./components/FormFill";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./tailwind.css";
import Home from "./screens/Home/Home";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  console.log("object");
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<FormCreation />} />
            <Route path="/fill-form/:id" element={<FormFill />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
