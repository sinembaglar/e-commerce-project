import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import api from '../api/axios'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const TR_PHONE_PATTERN = /^(\+90|0)?5\d{9}$/
const TAX_NO_PATTERN = /^T\d{4}V\d{6}$/
const IBAN_PATTERN = /^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/

const inputClass =
  'border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900'
const errorClass = 'text-xs text-red-500'

function SignupPage() {
  const history = useHistory()
  const [roles, setRoles] = useState([])
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { role_id: '' } })

  const selectedRoleId = watch('role_id')
  const selectedRole = roles.find((role) => String(role.id) === String(selectedRoleId))
  const isStore = selectedRole?.code === 'store'

  useEffect(() => {
    api.get('/roles').then(({ data }) => {
      setRoles(data)
      const customerRole = data.find((role) => role.code === 'customer')
      if (customerRole) setValue('role_id', String(customerRole.id))
    })
  }, [setValue])

  const onSubmit = async (formData) => {
    setSubmitError('')

    const payload = isStore
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role_id: Number(formData.role_id),
          store: {
            name: formData.storeName,
            phone: formData.storePhone,
            tax_no: formData.storeTaxNo,
            bank_account: formData.storeBankAccount,
          },
        }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role_id: Number(formData.role_id),
        }

    try {
      await api.post('/signup', payload)
      sessionStorage.setItem(
        'flashMessage',
        'You need to click link in email to activate your account!'
      )
      history.goBack()
    } catch (err) {
      setSubmitError(
        err.response?.data?.error || 'Something went wrong, please try again.'
      )
    }
  }

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Sign Up</h1>
          <p className="max-w-md text-sm text-neutral-500">
            Create an account to start shopping with SB Atelier.
          </p>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex max-w-md flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Full Name"
                className={inputClass}
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                })}
              />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Email Address"
                className={inputClass}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
                })}
              />
              {errors.email && <span className={errorClass}>{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Password"
                className={inputClass}
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: PASSWORD_PATTERN,
                    message:
                      'Min 8 characters, with upper, lower, number and special character',
                  },
                })}
              />
              {errors.password && (
                <span className={errorClass}>{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Confirm Password"
                className={inputClass}
                {...register('password2', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
              />
              {errors.password2 && (
                <span className={errorClass}>{errors.password2.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Controller
                name="role_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {isStore && (
              <>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Store Name"
                    className={inputClass}
                    {...register('storeName', {
                      required: 'Store name is required',
                      minLength: { value: 3, message: 'Store name must be at least 3 characters' },
                    })}
                  />
                  {errors.storeName && (
                    <span className={errorClass}>{errors.storeName.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Store Phone (e.g. +905551234567)"
                    className={inputClass}
                    {...register('storePhone', {
                      required: 'Store phone is required',
                      pattern: {
                        value: TR_PHONE_PATTERN,
                        message: 'Enter a valid Türkiye phone number',
                      },
                    })}
                  />
                  {errors.storePhone && (
                    <span className={errorClass}>{errors.storePhone.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Store Tax ID (e.g. T1234V123456)"
                    className={inputClass}
                    {...register('storeTaxNo', {
                      required: 'Store tax ID is required',
                      pattern: {
                        value: TAX_NO_PATTERN,
                        message: 'Format must match TXXXXVXXXXXX',
                      },
                    })}
                  />
                  {errors.storeTaxNo && (
                    <span className={errorClass}>{errors.storeTaxNo.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Store Bank Account (IBAN)"
                    className={inputClass}
                    {...register('storeBankAccount', {
                      required: 'Store bank account is required',
                      pattern: {
                        value: IBAN_PATTERN,
                        message: 'Enter a valid IBAN',
                      },
                    })}
                  />
                  {errors.storeBankAccount && (
                    <span className={errorClass}>{errors.storeBankAccount.message}</span>
                  )}
                </div>
              </>
            )}

            {submitError && <span className={errorClass}>{submitError}</span>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-2 self-center bg-sky-500 px-10 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default SignupPage
