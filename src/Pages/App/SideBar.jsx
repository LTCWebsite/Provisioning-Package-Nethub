import { Cottage, CreditCard, DisplaySettings, PersonOutline } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import logo from '../../Image/logo-2.png'
import { Scrollbars } from 'react-custom-scrollbars'
import { useLocation, useHistory } from 'react-router-dom'

function SideBar({ height }) {
    // const match = matchPath()
    const location = useLocation()
    const history = useHistory()
    const [path, setPath] = useState('')
    // useEffect(() => {
    //     setRoute(match.url)
    // }, [match])
    return (
        <div style={{ flexDirection: 'column', width: 130, backgroundColor: '#fff', textAlign: 'center', overflowY: 'scroll' }}>
            <Scrollbars style={{ height: (height - 40) }}>
                <img src={logo} className="logo-bar" alt='logo' />
                <div className="bar bar-active">
                    <Cottage className='bar-icon' />
                    <div>HOME</div>
                </div>
                <div className="bar" onClick={() => history.push("/crm")}>
                    <DisplaySettings className='bar-icon' />
                    <div>CRM</div>
                </div>
                <div className="bar">
                    <CreditCard className='bar-icon' />
                    <div>CARD</div>
                </div>
                <div className="bar">
                    <PersonOutline className='bar-icon' />
                    <div>USER</div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default SideBar