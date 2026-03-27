import type { Role } from "@/features/users/types/UserDomain"

export type UserRequestDTO = {
  firstName: string
  lastName: string
  email: string
  role: Role
  campus: string
  password: string
  course?: string | undefined
}

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  name:string
  avatarUrl: string
  handle: string
  email: string
}

export type UserResponseDTO = {
  token: string
  user: AuthUser
}
