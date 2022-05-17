import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Menu from './Pages/Menu/Menu'
import Login from './Pages/Login/Login'
import { ProtectRoute } from './Pages/Components/ProtectRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Home from './Home/Home'

const theme = createMuiTheme({
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
            {/* <Route path="/" exact component={Menu} /> */}
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <ProtectRoute path="/app" component={Menu} />
            <ProtectRoute path="/v2" component={Home} />
          </Switch>
        </Router>
        <ToastContainer />
      </MuiThemeProvider>
    </>
  )
}

export default App;
