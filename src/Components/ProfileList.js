import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { ArrowDropDown, ExitToApp, RecentActors } from '@material-ui/icons'
import Auth from '../Components/Auth'
import { useHistory } from 'react-router-dom'
import Crypt from '../Components/Crypt'

export default function ProfileList() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [info, setInfo] = React.useState(null)
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    Auth.logout(() => history.push('/login'))
  }
  React.useEffect(() => {
    try {
      setInfo(Crypt({ type: 'decrypt', value: localStorage.getItem("one_info") }).username)
    } catch (err) {

    }
  }, [])

  return (
    <>
      <label className="right-tab pointer" onClick={handleClick}>{info ?? '-'} <ArrowDropDown /></label>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><RecentActors /> &nbsp;&nbsp;ຂໍ້ມູນສ່ວນໂຕ</MenuItem>
        <MenuItem onClick={handleLogout}><ExitToApp /> &nbsp;&nbsp;ອອກຈາກລະບົບ</MenuItem>
      </Menu>
    </>
  )
}
