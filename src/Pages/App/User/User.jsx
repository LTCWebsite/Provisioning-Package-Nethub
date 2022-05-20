import React from 'react'
import { BarTitle } from '../../../Components/AutoFC'
import UserTab from './UserTab'

function User() {
    return (
        <div>
            <BarTitle page={"User"} />
            <UserTab />
        </div>
    )
}

export default User