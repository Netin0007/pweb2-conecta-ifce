import { http } from '@/infra/http/http-client'
import type { UserResponseDTO } from '../types/dto/AuthDTO'
import { clearAccessToken, setAccessToken } from '../storages/token.storage'

export async function LoginUser(email: string, password: string): Promise<UserResponseDTO> {
  const responseData = await http.post<UserResponseDTO>('auth/login', {
    email,
    password,
  })
  setAccessToken(responseData.token)
  return responseData
}

export function Logout(): void{
  clearAccessToken()
}
