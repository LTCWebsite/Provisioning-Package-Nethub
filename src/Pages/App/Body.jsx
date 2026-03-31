import React from 'react'
import Router from './Router'
import { Scrollbars } from 'react-custom-scrollbars'
import SearchCRM from './SearchCRM'
import { useLocation } from 'react-router-dom'

function Body({ height }) {
    const location = useLocation()
    return (
        <>
            <div style={{ width: '100%', marginLeft: 3, backgroundColor: '#fff', overflowY: 'hidden' }}>
                <div style={{ paddingLeft: 5 }}>
                    {/* {location.pathname === "/app" ? <SearchCRM /> : location.pathname === "/app/crm" ? <SearchCRM /> : null} */}
                    <Scrollbars style={{ height: (height - 40) }}>
                        <Router />
                    </Scrollbars>
                </div>
            </div>
        </>
    )
}

export default Body