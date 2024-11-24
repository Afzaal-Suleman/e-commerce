
class UserDTO {
    constructor(userdb) {
      this._id = userdb._id;
      this.name = userdb.name;
      this.email = userdb.email;
      this.role = userdb.role;
      this.address = userdb.address
      this.orderss = userdb.orderss
      this.refreshToken = userdb.refreshToken
    }
  }
  
  module.exports = UserDTO;
  