import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, userApi } from '../api';
import TextInput from '../components/UI/TextInput';
import Button from '../components/UI/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../storage/slices/user';
import { saveTokens } from '../utils/tokenStorage';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = React.useState({ email: '', password: '' });
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  const isFormValid = emailIsValid && passwordIsValid;

  const handleAuth = async () => {
    if (!isFormValid) return;

    try {
      setErrorMessage('');
      if (isRegister) {
        const response = await authApi.authControllerSignUpViaEmailRaw({
          emailAuthPayload: formValues,
        });

        const { accessToken, refreshToken } = await response.value();

        saveTokens(accessToken, refreshToken);

        setIsRegister(false);
      } else {
        const response = await authApi.authControllerSignInViaEmailRaw({
          emailAuthPayload: formValues,
        });
        const { accessToken, refreshToken } = await response.value();

        saveTokens(accessToken, refreshToken);

        navigate('/tasks');
      }

      const userProfile = await userApi.userControllerGetProfile();

      dispatch(
        setUser({
          name: userProfile.name,
          email: userProfile.email,
        })
      );
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        'An error occurred while processing your request.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {isRegister ? 'Register' : 'Login'}
        </h1>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
        )}
        <TextInput
          id="email"
          label="Email"
          type="email"
          validations={[
            { validator: (value) => value.trim() !== '', message: 'Email must not be empty.' },
            { validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email address.' },
          ]}
          onValidChange={(value, isValid) => {
            setFormValues((prev) => ({ ...prev, email: value }));
            setEmailIsValid(isValid);
          }}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          validations={[
            { validator: (value) => value.trim() !== '', message: 'Password must not be empty.' },
            { validator: (value) => value.length >= 6, message: 'Password must be at least 6 characters.' },
          ]}
          onValidChange={(value, isValid) => {
            setFormValues((prev) => ({ ...prev, password: value }));
            setPasswordIsValid(isValid);
          }}
        />
        <Button
          text={isRegister ? 'Register' : 'Login'}
          onClick={handleAuth}
          className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
        />
        <p className="text-sm text-center mt-4">
          {isRegister ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <button
            onClick={() => setIsRegister((prev) => !prev)}
            className="text-indigo-600 hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
