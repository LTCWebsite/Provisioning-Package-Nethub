// import Crypt from './Crypt'
import cookie from 'js-cookie'

class Auth {
  constructor() {
    try {
      // const checkLogin = cookie.get("one_session")
      // const checkToken = cookie.get("access_token")
      // if(checkToken===undefined){
      //   this.authenticated = false;
      // }else{
      //   if(checkLogin===true){
      //     this.authenticated = true;
      //   }else{
      //     this.authenticated = false;
      //   }
      // }
      if (typeof cookie.get("one_session") === "undefined") {
        this.authenticated = false
      } else {
        this.authenticated = true
      }
    } catch (err) {
      this.authenticated = false;
    }
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    localStorage.removeItem("login")
    cookie.remove("one_session")
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
