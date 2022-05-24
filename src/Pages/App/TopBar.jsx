import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { MyCrypt } from '../../Components/MyCrypt'

function TopBar() {
    const [topData, setTopData] = useState({ data: [] })

    const loadTopMenu = () => {
        let data = MyCrypt("de", localStorage.getItem("ONE_USER_ROLE"))
        setTopData({ ...topData, data: data })
        console.log(data)
    }

    useEffect(() => {
        loadTopMenu()
    }, [])

    const LinkList = ({ id, name }) => {
        if (id === '33') {
            return <>
                <form name="Loggingin" action="https://secure.gameloft.com/supporttool/index.php?module=Search" method="post" target='_blank'>
                    <input id="formUserName" name="loginUsername" value="laotel" type={"hidden"} />
                    <input id="formPassword" name="password" value="Gameloft@YCE20" type={"hidden"} />
                    <input type="submit" className='link-btn list' value={name} />
                </form>
            </>
        } else if (id === '27') {
            return <>
                <form class="form-layout" role="form" method="POST" action="https://mmp2.marvelmanager.com/login" target='_blank'>
                    <input type="hidden" name="_token" value="ZX0eeN5MVFtzSX9mIqL1yLWClkWGonGmMD1Qy9L3" />
                    <input type="hidden" name="login" value="Khamphone_101@hotmail.com" />
                    <input type="hidden" name="password" value="51d5985e" />
                    <input type="submit" value={name} className="link-btn list" />
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
                    <input type={"submit"} value={name} className="link-btn list" />
                </form>
            </>
        } else if (id === '25') {
            return <>
                <form method='POST' action='http://platform.linkit360.ru/main/login' target='_blank'>
                    <input type="hidden" name="_csrf-frontend" value="HI9w2nq-_MFJyk86MGOuoMW4pxhQDDot4TLiXjg10H1uvxn3AI2qtSGYJwJCW5nnq8vXX2E_SHuvc6A6dlS-Dg==" />
                    <input name="LoginForm[username]" type="hidden" value="cs.ltc" />
                    <input name="LoginForm[password]" type="hidden" value="123456" />
                    <input type={"submit"} value={name} className="link-btn list" />
                </form>
            </>
        } else {
            return <>{name}</>
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