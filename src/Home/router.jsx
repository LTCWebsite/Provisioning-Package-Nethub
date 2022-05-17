import { Switch } from 'react-router-dom'
import { ProtectRoute } from '../Pages/Components/ProtectRoute'
import Blank from './Pages/Blank'
import MiniCRM from './Pages/MiniCRM'

function Router() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/v2" component={Blank} exact />
                <ProtectRoute path="/v2/oneScreen" component={MiniCRM} exact />
            </Switch>
        </>
    )
}
export default Router