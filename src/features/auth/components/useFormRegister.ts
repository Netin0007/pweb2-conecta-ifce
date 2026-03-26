import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.shema'

import { setAccessToken } from '../storage/auth.storage'
import { ApiError } from '@/infra/http/api-error'
import { getCampuses, registerUser } from '../services/register.service'

export function UseFormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<Array<{ id: string; name: string }>>(
    [],
  )

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const data = await getCampuses()
        setCampuses(data)
      } catch (error) {
        console.error(error)
        if (error instanceof ApiError) {
          setRegisterError(error.message)
        }
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
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    const { course, ...rest } = data

    const payload = data.role === 'student' ? data : rest

    try {
      await registerUser(payload)
      navigate('/feed')
    } catch (error) {
      console.error(error)
      if (error instanceof ApiError) {
        setRegisterError(error.message)
      }
    }
  }

  return {
    state: {
      showPass,
      setShowPass,
      registerError,
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
