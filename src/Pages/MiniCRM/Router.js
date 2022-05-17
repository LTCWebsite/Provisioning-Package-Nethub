import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectRoute } from '../Components/ProtectRoute'

import MTopup from './page/MTopup'
import LuckyDraw from '../MiniCRM/page/LuckyDraw'
import Coda from '../MiniCRM/page/Coda'
import GameLoft from './page/GameLoft'
import LTCWifiHistory from './page/LTCWifiHistory'
import PinLTCWifiHistory from './page/PinLTCWifiHistory'
import LinkIT360 from './page/LinkIT360'
import TopupBanking from './page/TopupBanking'
import Borrow from './page/Borrow'
import Deduct from './page/Deduct'
import Topup from './page/Topup'
import PackageHistory from './page/PackageHistory'
import Package from './page/Package'
import HLR from './page/HLR'
import BorrowAndDeduct from './page/BorrowAndDeduct'
import SmsBanking from './page/SmsBanking'
import Game from './page/Game'
import GameUnsub from './page/GameUnsub'
import OCS from './page/OCS'

import Call from './page/Call'
// import BSS from './page/BSS'
import Redeem from './page/Redeem'
import WifiTab from './page/WifiTab'
// import Payment from './page/Payment'
import MService from './page/MService'

import BSSTab from './page/BSSTab'
import MmoneyTab from './page/MmoneyTab'
import HappyCall from './page/HappyCall'

function MyRouter() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/app" exact component={Package} />
                <ProtectRoute path="/app/oneScreen" exact component={Package} />
                <ProtectRoute path="/app/oneScreen/mtopup" exact component={MTopup} />
                <ProtectRoute path="/app/oneScreen/luackydraw" exact component={LuckyDraw} />
                <ProtectRoute path="/app/oneScreen/codaPay" exact component={Coda} />
                <ProtectRoute path="/app/oneScreen/gameloft" exact component={GameLoft} />
                <ProtectRoute path="/app/oneScreen/ltcwifiHistory" exact component={LTCWifiHistory} />
                <ProtectRoute path="/app/oneScreen/pinltcwifiHistory" exact component={PinLTCWifiHistory} />
                <ProtectRoute path="/app/oneScreen/linkit360" exact component={LinkIT360} />
                <ProtectRoute path="/app/oneScreen/topupbanking" exact component={TopupBanking} />
                <ProtectRoute path="/app/oneScreen/borrow" exact component={Borrow} />
                <ProtectRoute path="/app/oneScreen/BorrowAndDeduct" exact component={BorrowAndDeduct} />
                <ProtectRoute path="/app/oneScreen/deduct" exact component={Deduct} />
                <ProtectRoute path="/app/oneScreen/topup" exact component={Topup} />
                <ProtectRoute path="/app/oneScreen/packagehistory" exact component={PackageHistory} />
                <ProtectRoute path="/app/oneScreen/package" exact component={Package} />
                <ProtectRoute path="/app/oneScreen/hlr" exact component={HLR} />
                <ProtectRoute path="/app/oneScreen/smsbanking" exact component={SmsBanking} />
                <ProtectRoute path="/app/oneScreen/game" exact component={Game} />
                <ProtectRoute path="/app/oneScreen/gameunsubscribe" exact component={GameUnsub} />
                <ProtectRoute path="/app/oneScreen/ocs" exact component={OCS} />
                <ProtectRoute path="/app/oneScreen/call" exact component={Call} />
                <ProtectRoute path="/app/oneScreen/bss" exact component={BSSTab} />
                <ProtectRoute path="/app/oneScreen/redeem" exact component={Redeem} />
                <ProtectRoute path="/app/oneScreen/wifi" exact component={WifiTab} />
                <ProtectRoute path="/app/oneScreen/mmoney" exact component={MmoneyTab} />
                <ProtectRoute path="/app/oneScreen/mservice" exact component={MService} />
                <ProtectRoute path="/app/oneScreen/happycall" exact component={HappyCall} />
            </Switch>
        </>
    )
}

export default MyRouter
