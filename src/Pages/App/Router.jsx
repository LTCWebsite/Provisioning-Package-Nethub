import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectRoute } from '../../Components/ProtectRoute'
import Home from './Home/Home'
import CRM from './CRM/CRM'
import User from './User/User'

function Router() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/app" component={Home} exact />
                <ProtectRoute path="/app/crm" component={CRM} exact />
                <ProtectRoute path="/app/user" component={User} exact />
            </Switch>
        </>
    )
}

export default Router