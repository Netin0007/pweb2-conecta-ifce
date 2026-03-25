import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.shema"

import { http } from "@/infra/http/http-client"
import { setAccessToken } from "../storage/auth.storage"

export function UseFormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [campuses, setCampuses] = useState<
    Array<{ id: string; name: string }>
  >([])

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const data = await http.get<Array<{ id: string; name: string }>>(
          "campuses"
        )
        setCampuses(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCampuses()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { course, ...rest } = data
      const payload = data.role === "student" ? data : rest

      const response = await http.post<{
        token: string
        user: any
      }>("auth/register", payload)

      setAccessToken(response.token)
      navigate("/feed")
    } catch (error) {
      console.error(error)
    }
  }

  return {
    state: {
      showPass,
      setShowPass,
      campuses,
    },
    onSubmit,
    useForm: {
      register,
      handleSubmit,
      control,
      isSubmitting,
      isValid,
      errors,
      watch,
    },
  }
}
