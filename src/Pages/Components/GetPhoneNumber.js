import Crypt from '../Components/Crypt'

function GetPhoneNumber() {
    var myPhone = Crypt({type: "decrypt", value: localStorage.getItem("input-phone")})
    return myPhone.text
}

export default GetPhoneNumber
