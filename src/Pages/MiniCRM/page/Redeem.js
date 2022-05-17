import React from 'react'
import Iframe from 'react-iframe'

function Redeem() {
    return (
        <div>
            <Iframe
                url={"http://10.30.6.37:2424/Default.aspx?user=Administrator&password=qwerty123456&EmpID=VT3445&ani=2054289966"}
                position="absolute"
                width="97.7 %"
                id="myId"
                className="myClassname"
                height="100%"></Iframe>

            {/* <div dangerouslySetInnerHTML={{ __html: "<iframe src='http://10.30.6.37:2424/Default.aspx?user=Administrator&password=qwerty123456&EmpID=VT3445&ani=2054289966' />" }} /> */}
        </div>
    )
}

export default Redeem
