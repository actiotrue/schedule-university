import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/shared/ui/generic';
import { RegisterFormData, registerFormSchema } from '../model/schema';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '@/entities/user/api/mutations';

export const RegisterForm = () => {
  const { mutateAsync: registerUser, isPending: isRegistering } =
    useRegisterUserMutation();
  const { mutateAsync: loginUser, isPending: isLoggingIn } =
    useLoginUserMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({ body: data });

      await loginUser({
        body: { username: data.email, password: data.password },
      });

      navigate('/');
    } catch (error: any) {
      const serverMessage =
        error?.response?.data?.message || 'Произошла ошибка при регистрации';

      setError('root.serverError', {
        type: 'server',
        message: serverMessage,
      });
    }
  };

  const isLoading = isSubmitting || isRegistering || isLoggingIn;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md shadow-2xl bg-base-200">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {errors.root?.serverError && (
              <div
                role="alert"
                className="alert alert-error alert-outline w-full max-w-xs"
              >
                <span>{errors.root.serverError.message}</span>
              </div>
            )}

            <FormInput
              label="Почта"
              type="email"
              placeholder="Введите почту"
              errorText={errors.email?.message}
              registration={register('email')}
              disabled={isLoading} // Блокируем инпуты во время отправки
            />
            <FormInput
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              errorText={errors.password?.message}
              registration={register('password')}
              disabled={isLoading}
            />
            <FormInput
              label="Повторите пароль"
              type="password"
              placeholder="Повторите пароль"
              errorText={errors.repeat_password?.message}
              registration={register('repeat_password')}
              disabled={isLoading}
            />

            <div className="form-control mt-6 w-full max-w-xs">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner">
                    Регистрация...
                  </span>
                ) : (
                  'Зарегистрироваться'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm">Есть учетная запись? </span>
            <Link to="/login" className="link link-primary text-sm">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
