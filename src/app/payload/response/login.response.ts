import {Role} from "../../shared/models/role";

export interface LoginResponse {
  token: string
  refreshToken: string
  email: string
  roles: Role[],
  expiresAt: number
  type: string
}
