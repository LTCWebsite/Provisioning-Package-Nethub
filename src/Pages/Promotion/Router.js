import React from 'react'
import { Switch } from 'react-router-dom'
import { ProtectRoute } from '../Components/ProtectRoute'
import ProList from './Pages/ProList'
import ProUpload from './Pages/ProUpload'

function MyRouter() {
    return (
        <>
            <Switch>
                <ProtectRoute path="/app/promotion" exact component={ProList} />
                <ProtectRoute path="/app/promotion/upload" exact component={ProUpload} />
            </Switch>
        </>
    )
}

export default MyRouter
