import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectRoute } from '../Components/ProtectRoute'

import CheckSerial from './pages/CheckSerial'
import CheckLuckyDraw from './pages/CheckLuckyDraw'
import CheckMultiSerial from './pages/CheckMultiSerial'
import CheckPIN from './pages/CheckPIN'


function MyRouter() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/app/checkcard" exact component={CheckSerial} />
                <ProtectRoute path="/app/checkcard/checkserial" exact component={CheckSerial} />
                <ProtectRoute path="/app/checkcard/checkluckydraw" exact component={CheckLuckyDraw} />
                <ProtectRoute path="/app/checkcard/checkmultiserial" exact component={CheckMultiSerial} />
                <ProtectRoute path="/app/checkcard/checkpin" exact component={CheckPIN} />
            </Switch>
        </>
    )
}

export default MyRouter
