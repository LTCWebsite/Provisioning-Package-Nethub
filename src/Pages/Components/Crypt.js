import CryptoJS from 'crypto-js'
const Crypt = ({type: Type, value: Value}) => {
    if(Type==='crypt'){
        return CryptoJS.AES.encrypt(Value, "secret_key_the_one").toString()
    }else if(Type==='decrypt'){
        return JSON.parse(CryptoJS.AES.decrypt(Value, "secret_key_the_one").toString(CryptoJS.enc.Utf8))
    }
}
export default Crypt