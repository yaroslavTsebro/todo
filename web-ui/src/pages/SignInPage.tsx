import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi, userApi } from '../api';
import { saveTokens } from '../utils/tokenStorage';
import TextInput from '../components/UI/TextInput';
import Button from '../components/UI/Button';
import { setAccessToken, setUser } from '../storage/slices/user';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = React.useState({ email: '', password: '' });
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const isFormValid = emailIsValid && passwordIsValid;

  const handleSignIn = async () => {
    if (!isFormValid) return;

    try {
      setErrorMessage('');

      const response = await authApi.authControllerSignInViaEmailRaw({
        emailAuthPayload: formValues,
      });

      const {accessToken, refreshToken} = await response.value()

      saveTokens(accessToken, refreshToken);
      dispatch(setAccessToken(accessToken));

      const userProfile = await userApi.userControllerGetProfile();
      dispatch(
        setUser({
          name: userProfile.name,
          email: userProfile.email,
        })
      );

      navigate('/tasks');
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'An error occurred during sign-in.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-xl font-semibold mb-4 text-center">Sign In</h1>
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
          text="Sign In"
          onClick={handleSignIn}
          className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
        />
        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
