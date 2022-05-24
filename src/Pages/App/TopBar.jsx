import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { MyCrypt } from '../../Components/MyCrypt'

function TopBar() {
    const [topData, setTopData] = useState({ data: [] })

    const loadTopMenu = () => {
        let data = MyCrypt("de", localStorage.getItem("ONE_USER_ROLE"))
        setTopData({ ...topData, data: data })
        // console.log(data)
    }

    useEffect(() => {
        loadTopMenu()
    }, [])

    const LINKTO = (id) => {
        if (id === '20') {
            console.log('LINK to Info178')
            // let form = new FormData()
            // form.append('txt_user_id', 'cct101')
            // form.append('txt_pass', 'Call@178')
            // axios.post("http://172.28.12.55:1178", form, {
            //     headers: { 'content-type': 'multipart/form-data' }
            // }).then(res => {
            //     console.log(res.data)
            // })
            let link_form = `<div id="grid1" class="grid" style="text-align: center">
            <h4 class="text-light" style="font-family: 'Phetsarath OT'; text-align: center">
                <span id="lbbbb" style="color:White;">ລົງຊື່ເຂົ້າໃຊ້ງານ / Sign in</span>
            </h4>

            <div class="input-control modern text iconic" data-role="input" style="font-family: 'Phetsarath OT'; font-size: smaller;">
                <input name="txt_user_id" type="text" id="txt_user_id" style="font-family: &quot;Phetsarath OT&quot;; padding-right: 5px;" data-popover-color="fg-white" data-popover-background="bg-red" data-popover-text="ຊື່ຜູ້ໃຊ້ງານບໍ່ຖືກຕ້ອງ ຫຼື ເປັນປະເພດ ( MIS ARC ຍັງຢູ່ໃນຊ້ວງປັບປຸງ )" data-popover-position="right" data-popover-mode="focus">
                <span class="label" style="font-size: small; color: white">ຊື່ຜູ້ໃຊ້ງານ / User ID
                </span>
                <span class="informer" style="font-size: 8px; color: white">ກະລຸນາປ້ອນ ຊື່ຜູ້ໃຊ້ງານ / Please enter you user ID
                </span>
                <span class="placeholder" style="font-size: small; color: white; display: block;">ຊື່ຜູ້ໃຊ້ງານ / User ID...
                </span>
                <span class="icon mif-user" style="color: white"></span>
            </div>
            <br>
            <div class="input-control modern text iconic" data-role="input" style="font-family: 'Phetsarath OT'; font-size: smaller;">
                <input name="txt_pass" type="password" id="txt_pass" style="font-family: &quot;Phetsarath OT&quot;; padding-right: 5px;" data-popover-color="fg-white" data-popover-background="bg-red" data-popover-text="ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" data-popover-position="right" data-popover-mode="focus">
                <span class="label" style="font-size: small; color: white">ລະຫັດຜ່ານ / Password</span>
                <span class="informer" style="font-size: 8px; color: white">ກະລຸນາປ້ອນ ລະຫັດຜ່ານ / Please enter you Password</span>
                <span class="placeholder" style="font-size: small; color: white; display: block;">ລະຫັດຜ່ານ / Password...</span>
                <span class="icon mif-lock" style="color: white"></span>
            </div>
            <br>
            <br>
            
            <button onclick="__doPostBack('btn_login','')" id="btn_login" type="submit" class="button primary" data-role="hint">
                <span class="icon mif-sp
                    
                     mif-ani-pulse"></span>
                Login
            </button>

            <a id="LinkButton_SignUp" href="javascript:__doPostBack('LinkButton_SignUp','')" style="color:White;font-family:Phetsarath OT;">ສ້າງລະຫັດຜ່ານໃຫມ່ / Sign up</a>

        </div>`
        } else if (id === '33') {
            let form = `<div id="form_box" class="greybgSection">
            <form name="Loggingin" action="index.php?module=Search" method="post">
            <!--<div class="sectionTitle">Login Failed</div>--><div id="formTxt1" class="formTxt">Username:</div>
            <div id="formTxt2" class="formTxt">Password:</div>
            <input id="formUserName" name="loginUsername" value="laotel">
            <input id="formPassword" type="password" name="password" value="Gameloft@YCE20">
            <!--<div id="captcha" class="g-recaptcha" data-sitekey="6LeQkCQUAAAAAOlVQIfkjjp-WDJb4De1vwHCjSsQ"></div>-->
            <input id="logbtn" type="image" alt="Login" src="images/login-button.gif" name="submit">
            </form>
            </div>`
            document.getElementById("form_box").onsubmit()
        }
    }

    return (
        <>
            <div className='frame'>
                {topData.data.map((row, idx) => {
                    return (
                        <div className={idx === 0 ? 'list p-right' : 'list'} key={idx} onClick={() => LINKTO(row.ID)}><FadeIn>
                            {row.ID === '33' ?
                                <>
                                <form name="Loggingin" action="https://secure.gameloft.com/supporttool/index.php?module=Search" method="post" target='_blank'>
                                    <input id="formUserName" name="loginUsername" value="laotel" type={"hidden"} />
                                    <input id="formPassword" name="password" value="Gameloft@YCE20" type={"hidden"} />
                                    <input id="logbtn" type="submit" className='link-btn list' alt="Login" value={row.Name} />
                                </form>
                                </> : row.Name}
                        </FadeIn></div>
                    )
                })}
            </div>
        </>
    )
}

export default TopBar