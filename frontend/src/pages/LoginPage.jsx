import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { login } from '../redux/actions/clientActions'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass = 'border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900'
const errorClass = 'text-xs text-red-500'

function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const from = location.state?.from || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async ({ email, password, rememberMe }) => {
    try {
      await dispatch(login(email, password, rememberMe))
      history.push(from)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed, please try again.')
    }
  }

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Login</h1>
          <p className="max-w-md text-sm text-neutral-500">
            Sign in to continue shopping with SB Atelier.
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
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <span className={errorClass}>{errors.password.message}</span>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-neutral-500">
              <input type="checkbox" {...register('rememberMe')} />
              Remember me
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-2 self-center bg-sky-500 px-10 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Login
            </button>

            <p className="text-center text-sm text-neutral-500">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-bold text-sky-500">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
