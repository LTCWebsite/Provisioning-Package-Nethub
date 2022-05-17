import React from "react"
import Switch from "@material-ui/core/Switch"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      track: {
        "$checked$checked + &": {
          opacity: 1.0,
          backgroundColor: "hsl(120, 32%, 57%)"
        }
      }
    }
  }
})
function MySwitch ({...rest}) {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch {...rest} />
    </MuiThemeProvider>
  )
}
export default MySwitch
