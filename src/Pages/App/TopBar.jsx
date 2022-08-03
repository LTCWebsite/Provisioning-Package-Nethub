import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { MyCrypt } from '../../Components/MyCrypt'

function TopBar() {
    const [topData, setTopData] = useState({ data: [] })

    const loadTopMenu = () => {
        let data = MyCrypt("de", localStorage.getItem("ONE_USER_ROLE"))
        let update = data?.map(row => {
            row.Pass = row?.Password !== "" ? MyCrypt("de", row.Password) : ''
            return row
        })
        setTopData({ ...topData, data: update })
        // console.log(update)
    }

    useEffect(() => {
        loadTopMenu()
    }, [])

    const LinkList = ({ id, name }) => {
        if (id === '1') {
            return <>
                <form name="Loggingin" action="http://10.0.0.97:8080/BOE/portal/1603042213/InfoView/logon.faces" method="post" target='_blank'>
                    <input name="_id0:logon:CMS" value="192.168.200.97" type={"hidden"} />
                    <input name="_id0:logon:USERNAME" value={topData.data[0]?.Username} type={"hidden"} />
                    <input name="_id0:logon:PASSWORD" value={topData.data[0]?.Pass} type={"hidden"} />
                    <input name="com.sun.faces.VIEW" value="_id3781:_id3782" type={"hidden"} />
                    <input name="_id0" value="_id0" type={"hidden"} />
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '4') {
            return <>
                <form method='POST' action='http://10.0.20.14/support/?act=login&lang=en' target='_blank'>
                    <input name="username" type="hidden" value="CCLTC" />
                    <input name="password" type="hidden" value="123123" />
                    <input name="submit" type="hidden" value="1" />
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '5') {
            return <>
                <form name="Loggingin" action="https://10.0.10.11:8080/#/login" method="get" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '6') {
            return <>
                <form name="Loggingin" action="http://10.30.6.37:2424/" method="post" target='_blank'>
                    <input name="ScriptManager1" value="UpdatePanel1|btnLogin" type={"hidden"} />
                    <input name="__EVENTTARGET" value="" type={"hidden"} />
                    <input name="__EVENTARGUMENT" value="" type={"hidden"} />
                    <input name="__VIEWSTATE" value="/wEPDwUJNjEwMDEzMDMxD2QWAgIBD2QWAgIDD2QWAmYPZBYEAgEPZBYEAgUPFgIeB1Zpc2libGVoZAIHDxYCHwBoZAIDDxYCHwBoZGQBYIKpDO48hQFJ9/mmTevbpM9BKJcQ1lv2mE+OIVMa+A==" type={"hidden"} />
                    <input name="__VIEWSTATEGENERATOR" value="CA0B0334" type={"hidden"} />
                    <input name="__EVENTVALIDATION" value="/wEdAAV/qUUpGn+9IbL2q+CVVt9wVK7BrRAtEiqu9nGFEI+jB3Y2+Mc6SrnAqio3oCKbxYZ100z73I0ej3E4zrB15fTLop4oRunf14dz2Zt2+QKDEHS593usdHIMGF6NMZ8r+cvnkTmz64jVDr84xK+anCaM" type={"hidden"} />
                    <input name="__ASYNCPOST" value="true" type={"hidden"} />
                    <input name="txtUsername" value={topData.data[5]?.Username} type={"hidden"} />
                    <input name="txtPassword" value={topData.data[5]?.Pass} type={"hidden"} />
                    <input name="btnLogin" value="ເຂົ້າສູ່ລະບົບ" type={"hidden"} />
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '7') {
            return <>
                <form name="Loggingin" action="http://10.30.3.14/maximo/ui/login?welcome=true" method="post" target='_blank'>
                    <input name="allowinsubframe" value="null" type={"hidden"} />
                    <input name="mobile" value="false" type={"hidden"} />
                    <input name="login" value="jsp" type={"hidden"} />
                    <input name="localStorage" value="true" type={"hidden"} />
                    <input name="loginstamp" value="1654485462558" type={"hidden"} />
                    <input name="username" value={topData.data[6]?.Username} type={"hidden"} />
                    <input name="password" value={topData.data[6]?.Pass} type={"hidden"} />
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '8') {
            return <>
                <form name="Loggingin" action="http://10.30.6.123/" method="post" target='_blank'>
                    <input name="LoginForm[username]" value={topData.data[7]?.Username} type={"hidden"} />
                    <input name="LoginForm[password]" value={topData.data[7]?.Pass} type={"hidden"} />
                    <input name="yt0" value="Login" type={"hidden"} />
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '9') {
            return <>
                <form name="Loggingin" action="http://10.30.5.30:3939/login.jsp" method="post" target='_blank'>
                    <input name="txtUserName" value={topData.data[8]?.Username} type={"hidden"} />
                    <input name="txtPassword" value={topData.data[8]?.Pass} type={"hidden"} />
                    <input name="cboLanguage" value="Eng" type={"hidden"} />
                    <input name="DONE" value="Login" type={"hidden"} />
                    <input name="action" value="check" type={"hidden"} />
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '11') {
            return <>
                <form name="Loggingin" action="http://10.30.6.148:8899/Account/Login?ReturnUrl=%2F" method="post" target='_blank'>
                    <input name="Email" value={topData.data[10]?.Username} type={"hidden"} />
                    <input name="Password" value={topData.data[10]?.Pass} type={"hidden"} />
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '12') {
            return <>
                <form name="Loggingin" action="https://10.180.2.65:8182" method="get" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '13') {
            return <>
                <form name="Loggingin" action="https://192.168.222.197/login.html" method="get" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '14') {
            return <>
                <form method='POST' action='http://172.28.24.20/ltc/users/login' target='_blank'>
                    <input name="data[User][username]" type="hidden" value="cs1" />
                    <input name="data[User][password]" type="hidden" value="cs1" />
                    <input name="_method" type="hidden" value="POST" />
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '15') {
            return <>
                <form method='POST' action='http://172.28.24.22/login' target='_blank'>
                    <input name="username" type="hidden" value="CS" />
                    <input name="password" type="hidden" value="CS" />
                    <input name="_token" type="hidden" value="yMpDqVSMJsjiYXDsoVUkBjVzQFzMVWwaaxAHt0zW" />
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '20') {
            return <>
                <form method='POST' action='http://172.28.12.55:1178/LoginF.aspx' target='_blank' id='form'>
                    <input name="txt_user_id" type="hidden" id="txt_user_id" value="cct101" />
                    <input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="btn_login" />
                    <input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
                    <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="IjGF/bHV1gyxuQjp8PIIvoXkddU4oyDaD+oMeJcfbqqwAzf18JGtIi4v4tyX/ZX1AryZZm8u5D6JgYIVpKp4kmdXZUmrODRk7lnVLqR2RGFCStjTNoJBv/nQcmlBAnGRhSNdvCdjD9J6lZd0YVt33aDtmFgJ9ZLKXY1yjLe0/gw=" />
                    <input name="txt_pass" type="hidden" id="txt_pass" value="Call@178" />
                    <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="7BA1DB76" />
                    <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="XgfixId+6JlBn/wadtdcelFRwhr8RXOXQTG9NhCD73cLhRTn8zX0H4Gms18GUscRyycV4FNN1vARIXn1GM4uXKqzGJ+KNmZzZH2bMGPPQIcFhcFShjQklOEPcmz3aZrsgGPs02OOU2tICpqVZh+lrd8vQC5PykK7L5IZZ+3AlKYGEP3rpmT4axCC/oIgROTj" />
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '21') {
            return <>
                <form name="Loggingin" action="http://datacenter.laotel.com:5000" method="get" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '23') {
            return <>
                <form name="Loggingin" action="http://10.0.0.95/crm/login.php" method="get" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '24') {
            return <>
                <form method='get' action='http://172.28.12.115:9000/users/login' target='_blank'>
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '25') {
            return <>
                <form method='POST' action='http://platform.linkit360.ru/main/login' target='_blank'>
                    <input type="hidden" name="_csrf-frontend" value="HI9w2nq-_MFJyk86MGOuoMW4pxhQDDot4TLiXjg10H1uvxn3AI2qtSGYJwJCW5nnq8vXX2E_SHuvc6A6dlS-Dg==" />
                    <input name="LoginForm[username]" type="hidden" value="cs.ltc" />
                    <input name="LoginForm[password]" type="hidden" value="123456" />
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '26') {
            return <>
                <form method='GET' action='http://game.laotel.com:8080/#/dashboard' target='_blank'>
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '27') {
            return <>
                <form class="form-layout" role="form" method="POST" action="https://mmp2.marvelmanager.com/login" target='_blank'>
                    <input type="hidden" name="_token" value="ksIKZgFXmQSPsOrQXYLqSreDdBsHVdYoLuyCmFTW" />
                    <input type="hidden" name="login" value="Khamphone_101@hotmail.com" />
                    <input type="hidden" name="password" value="51d5985e" />
                    <input type="submit" value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '28') {
            return <>
                <form method='GET' action='https://10.40.67.119:8443/explorer/login' target='_blank'>
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '29') {
            return <>
                <form method='GET' action='http://10.0.10.201:8080' target='_blank'>
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '30') {
            return <>
                <form method='GET' action='https://192.168.207.146:31943/unisso/login.action?service=%2Funisess%2Fv1%2Fauth%3Fservice%3D%252Fncecommonwebsite%252Fv1%252Fnewportal%252Findex.html%253Frefr-flags%253De' target='_blank'>
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '31') {
            return <>
                <form method='POST' action='http://www.sod.laotel.com/wp-login.php' target='_blank'>
                    <input name="log" type="hidden" value={topData.data[30]?.Username} />
                    <input name="pwd" type="hidden" value={topData.data[30]?.Pass} />
                    <input name="wp-submit" type="hidden" value="Log In" />
                    <input name="redirect_to" type="hidden" value="http://www.sod.laotel.com" />
                    <input name="testcookie" type="hidden" value="1" />
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '32') {
            return <>
                <form method='GET' action='http://10.30.6.98:5152/Account/Login?ReturnUrl=%2FHome%2FRerun' target='_blank'>
                    <input type={"submit"} value={name} className="link-btn list-a" />
                </form>
            </>
        } else if (id === '33') {
            return <>
                <form name="Loggingin" action="https://secure.gameloft.com/supporttool/index.php?module=Search" method="GET" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '34') {
            return <>
                <form name="Loggingin" action="https://sp.openlife.huawei.com:31943" method="GET" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '35') {
            return <>
                <form name="Loggingin" action="http://115.84.121.37/" method="GET" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else if (id === '36') {
            return <>
                <form name="Loggingin" action="http://10.30.6.48:8080/POS" method="GET" target='_blank'>
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        } else {
            return <>
                <form name="Loggingin">
                    <input type="submit" className='link-btn list-a' value={name} />
                </form>
            </>
        }
    }

    return (
        <>
            <div className='frame'>
                {topData.data.map((row, idx) => {
                    return (
                        <div className={idx === 0 ? 'list' : 'list'} key={idx}><FadeIn>
                            <LinkList id={row.ID} name={row.Name} />
                        </FadeIn></div>
                    )
                })}
            </div>
        </>
    )
}

export default TopBar