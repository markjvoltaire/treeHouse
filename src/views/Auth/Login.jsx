import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PrivateRoute } from '../../components/PrivateRoute/PrivateRoute';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import styles from './Login.css';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { formState, handleFormChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState(null);
  console.log(history);

  // The `from` property of `location.state` gives us
  // the URL to redirect to after logging in.
  const { from } = location.state || { from: { pathname: '/' } };

  const handleLogin = (event) => {
    event.preventDefault();
    setError('it dont work');
    const loginWasSuccessful = auth.login(formState.email, formState.password);
    loginWasSuccessful ? history.replace(from) : error;
    console.log(loginWasSuccessful);

    // TODO: If login was unsuccessful, set an error with a message
    // to display to the user that their login failed.
    //
    // If login was successful, use the history hook
    // from React Router to replace the current URL with the URL
    // we need to redirect to.
    // See https://v5.reactrouter.com/web/api/history for the appropriate method to use
  };

  return (
    <>
      <h3>You must log in to view the page at {from.pathname}</h3>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <label>
          Email
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleFormChange}
          />
        </label>
        <label>
          Password
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleFormChange}
          />
        </label>
        <button type="submit" aria-label="Sign In">
          Sign in
        </button>
      </form>
      {error && <h4 className={styles.error}>{error}</h4>}
    </>
  );
}
