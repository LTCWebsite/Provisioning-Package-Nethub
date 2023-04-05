import { Phone, Search } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast_error } from '../../Components/Toast'

function SearchCRM() {
    const [Phone, setPhone] = useState('')
    const history = useHistory()
    useEffect(() => {
        try {
            let p = localStorage.getItem("ONE_PHONE")
            setPhone(p)
        } catch (error) {
            setPhone("")
        }
    }, [])
    const changePhone = (e) => {
        if (e.length > 11) {
            let number = e.replaceAll(/\s/g, '')
            let newPhone = ''
            if (number.includes("+85620")) {
                newPhone = String(number).substring(4, 14)
            } else if (number.includes("20")) {
                newPhone = number
            }

            if (newPhone.length === 11) {
                setPhone(newPhone)
                // setNbad({ ...nbad, fc: false })
            }
        } else {
            setPhone(e)
            // setNbad({ ...nbad, fc: false })
        }
    }
    const searchPhoneNumber = () => {
        if (Phone === '' || Phone === null) {
            toast_error({ text: "ກະລຸນາປ້ອນເບີ !!" })
        }else if(localStorage.getItem('USERNAME').includes('tplus') && Phone.startsWith('205')){
            toast_error({ text: "User ຂອງທ່ານບໍ່ສາມາດດຶງຂໍ້ມູນເບີ 5 ໄດ້!!" })
        }else if(localStorage.getItem('USERNAME').includes('laotel') && Phone.startsWith('207')){
            toast_error({ text: "User ຂອງທ່ານບໍ່ສາມາດດຶງຂໍ້ມູນເບີ 7 ໄດ້!!" })
        }else {
            localStorage.setItem("ONE_PHONE", Phone)
            history.push("/app")
            setTimeout(() => {
                history.push("/app/crm")
            }, 200)
        }
    }
    const checkKey = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            searchPhoneNumber()
        }
    }
    console.log(localStorage.getItem('USERNAME'))
    // if(localStorage.getItem('USERNAME').includes('tplus')){
    //     console.log('laotel')
    // }else{
    //     console.log('other')
    // }
    return (
        <Grid container className='search'>
            <Grid item xs={4} lg={8}></Grid>
            <Grid item xs={5} lg={2}>
                <input
                    type={"search"}
                    maxLength="11"
                    className='v-input input-1'
                    placeholder= {localStorage.getItem('USERNAME').includes('tplus') ? '207xxxxxxx' : '205xxxxxxx'}
                    value={Phone}
                    onChange={(e) => {
                        changePhone(e.target.value)
                        localStorage.setItem("ONE_PHONE", e.target.value)
                    }}
                    onKeyPress={(e) => checkKey(e)}
                />
            </Grid>
            <Grid item xs={2} lg={1}>
                <Button
                    variant='contained'
                    className='btn-primary'
                    style={{ marginLeft: 5, marginTop: 5 }}
                    onClick={searchPhoneNumber}
                >
                    <Search />
                </Button>
            </Grid>
        </Grid>
    )
}

export default SearchCRM