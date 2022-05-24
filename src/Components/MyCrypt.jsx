import CryptoJS from 'crypto-js'

export const MyCrypt = (Type, Value) => {
    if (Type === 'en') {
        return CryptoJS.AES.encrypt(Value, "secret_key_the_one").toString()
    } else if (Type === 'de') {
        return JSON.parse(CryptoJS.AES.decrypt(Value, "secret_key_the_one").toString(CryptoJS.enc.Utf8))
    } else if(Type === 'des'){
        return CryptoJS.AES.decrypt(Value, "secret_key_the_one").toString()
    }
}