import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ProtectRoute } from './Components/ProtectRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
// import Login from './Pages/Login/Login';
import Defualt from './Pages/App/Defualt';

import 'react-perfect-scrollbar/dist/css/styles.css';
import NewLogin from './Pages/Login/NewLogin'
import { RequestOTP } from './Pages/App/Resetpassword/requestOTP'
import { VerifyOTP } from './Pages/App/Resetpassword/verifyOTP'

import Newresetpass from './Pages/App/Resetpassword/oneresetpass'

const theme = createTheme({
  overrides: {
    MuiSwitch: {
      track: {
        "$checked$checked + &": {
          opacity: 0.6,
          backgroundColor: "hsl(120, 32%, 57%)"
        }
      }
    }
  }
})

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={NewLogin} />
            <Route path="/login" exact component={NewLogin} />
            <Route path="/login2" exact component={RequestOTP} />
            <Route path="/verifyOTP" exact component={VerifyOTP} />
            <Route path="/requestOTP" exact component={RequestOTP} />
            <Route path="/Newresetpassword" exact component={Newresetpass} />
            <ProtectRoute path="/app" component={Defualt} />
          </Switch>
        </Router>
        <ToastContainer />
      </MuiThemeProvider>
    </>
  )
}

export default App;




