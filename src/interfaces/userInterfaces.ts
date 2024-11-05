export interface LoginModel{
  email:string,
  password:string
}

export interface UserModel{
  _id:string,
  email:string,
  username:string,
  password:string
}

export interface UserResponseModel{
  data:UserModel[]
}

export interface PostUserModel{
  email:string
  username:string
  password:string
}

export interface EditUserModel{
  email:string
  username:string
}

export interface UpdateUserPasswordModel{
  password:string
}