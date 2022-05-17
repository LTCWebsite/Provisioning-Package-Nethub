import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectRoute } from '../../Components/ProtectRoute'
import Home from './Home/Home'
import CRM from './CRM/CRM'

function Router() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/app" component={Home} />
                <ProtectRoute path="/crm" component={CRM} exact />
            </Switch>
        </>
    )
}

export default Router