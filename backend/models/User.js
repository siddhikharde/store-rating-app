class User {
  constructor(name,email,password,address,role="user"){
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.role = role;
  }
}

export default User;