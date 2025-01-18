import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, userApi } from '../api';
import TextInput from '../components/UI/TextInput';
import Button from '../components/UI/Button';
import { setUser } from '../storage/slices/user';
import { saveTokens } from '../utils/tokenStorage';
import { useDispatch } from 'react-redux';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = React.useState({ email: '', password: '' });
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const isFormValid = emailIsValid && passwordIsValid;

  const handleSignUp = async () => {
    if (!isFormValid) return;

    try {
      setErrorMessage('');

      const  { accessToken, refreshToken } = await authApi.authControllerSignUpViaEmail({
        emailAuthPayload: formValues,
      });

      saveTokens(accessToken, refreshToken);
      console.log(1);
      const userProfile = await userApi.userControllerGetProfile();

      dispatch(
        setUser({
          name: userProfile.name,
          email: userProfile.email,
        })
      );

      navigate('/dashboard');


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'An error occurred during sign-up.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-xl font-semibold mb-4 text-center">Sign Up</h1>
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
          text="Sign Up"
          onClick={handleSignUp}
          className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
        />
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-indigo-600 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
