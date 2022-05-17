import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ArrowDropDown, Logout, PersonOutline } from '@mui/icons-material'
import Auth from '../../../Pages/Components/Auth'
import { useHistory } from 'react-router-dom';

export default function Profile({ username }) {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        Auth.logout(() => {
            history.push("/login")
        })
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size='small'
                color='inherit'
                style={{ textTransform: 'none' }}
            >
                {username} <ArrowDropDown />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className="profile"
            >
                <MenuItem onClick={handleClose}><PersonOutline /> &nbsp;ຂໍ້ມູນສ່ວນໂຕ</MenuItem>
                <MenuItem onClick={logout}><Logout /> &nbsp;ອອກຈາກລະບົບ</MenuItem>
            </Menu>
        </div>
    );
}
