import React from 'react'
import { Switch, BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectRoute } from '../../Components/ProtectRoute'
import Home from './Home/Home'
import CRM from './CRM/CRM'
import User from './User/User'
import Card from './Card/Card'
import Redeem from './AIS/Redeem'
import Resetpass from './Resetpassword/resetpass'
import QueryCustomerInfo from './CBS/QueryCustomerInfo'
import { RequestOTP } from './Resetpassword/requestOTP'
import { VerifyOTP } from './Resetpassword/verifyOTP'
import Oneresetpass from './Resetpassword/oneresetpass'
import PackageNethub from './ProvisioningPackage/PackageNethub'

function Router() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/app" component={Home} exact />
                <ProtectRoute path="/app/crm" component={CRM} exact />
                <ProtectRoute path="/app/user" component={User} exact />
                <ProtectRoute path="/app/card" component={Card} exact />
                <ProtectRoute path="/app/ais/redeem" component={Redeem} exact />

                <ProtectRoute path="/app/resetpassword" component={Resetpass} exact />
                {/* <ProtectRoute path="/app/Newresetpassword" component={Oneresetpass} exact /> */}


                {/* <ProtectRoute path="/app/requestOTP" component={RequestOTP} exact /> */}
                {/* <ProtectRoute path="/app/verifyOTP" component={VerifyOTP} exact /> */}

                <ProtectRoute path="/app/cbs/customerinfo" component={QueryCustomerInfo} exact />
                <ProtectRoute path="/app/provisioning-package" component={PackageNethub} exact />

            </Switch>

        </>
    )
}

export default Router