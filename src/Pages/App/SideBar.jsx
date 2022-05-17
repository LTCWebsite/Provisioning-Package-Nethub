import { Cottage, CreditCard, DisplaySettings, PersonOutline } from '@mui/icons-material'
import React from 'react'
import logo from '../../Image/logo-2.png'
import { Scrollbars } from 'react-custom-scrollbars'
import { useHistory, useLocation } from 'react-router-dom'
import FadeIn from 'react-fade-in'

function SideBar({ height }) {
    const history = useHistory()
    const location = useLocation()
    const ChangeRoute = (e) => {
        history.push(e)
    }
    return (
        <div style={{ flexDirection: 'column', width: 130, backgroundColor: '#fff', textAlign: 'center', overflowY: 'scroll' }}>
            <Scrollbars style={{ height: (height - 40) }}>
                <img src={logo} className="logo-bar" alt='logo' />
                <FadeIn>
                    <div className={location.pathname === "/app" ? "bar bar-active" : "bar"} onClick={() => ChangeRoute("/app")}>
                        <Cottage className='bar-icon' />
                        <div>HOME</div>
                    </div>
                </FadeIn>
                <div className={location.pathname === "/app/crm" ? "bar bar-active" : "bar"} onClick={() => ChangeRoute("/app/crm")}>
                    <DisplaySettings className='bar-icon' />
                    <div>CRM</div>
                </div>
                <div className={location.pathname === "/app/card" ? "bar bar-active" : "bar"} onClick={() => ChangeRoute("/app/card")}>
                    <CreditCard className='bar-icon' />
                    <div>CARD</div>
                </div>
                <div className={location.pathname === "/app/user" ? "bar bar-active" : "bar"} onClick={() => ChangeRoute("/app/user")}>
                    <PersonOutline className='bar-icon' />
                    <div>USER</div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default SideBar