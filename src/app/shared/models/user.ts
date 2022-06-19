import {Role} from "./role";

export interface User {
  id?: number,
  firstName?: String,
  lastName?: String,
  email: String,
  password: String
  avatar?: File | null,
  roles?: Role
}
