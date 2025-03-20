import {
  Formik,
  Form,
  FormikHelpers,
  FormikErrors,
  FormikTouched,
} from 'formik';
import styled from 'styled-components';

import { TextInput, Button } from '../../components';
import { useAuth } from '../../hooks';

export interface LoginValues {
  username: string;
  password: string;
}

const validate = (values: LoginValues) => {
  const errors: Partial<LoginValues> = {};

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

interface LoginFormProps {
  handleOnSubmit: (values: LoginValues) => Promise<void>;
}

const shouldDisplayLoginError = (
  errors: FormikErrors<LoginValues>,
  touched: FormikTouched<LoginValues>,
) => {
  return (
    !errors.username &&
    !touched.username &&
    !errors.password &&
    !touched.password
  );
};

function LoginForm({ handleOnSubmit }: LoginFormProps) {
  const { loginError } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (
          values: LoginValues,
          { resetForm }: FormikHelpers<LoginValues>,
        ) => {
          await handleOnSubmit(values);

          resetForm();
        }}
        validate={validate}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <TextInput
              name="username"
              placeholder="Enter your username"
              label="Username"
              type="text"
              isError={!!(errors.username && touched.username)}
            />

            <TextInput
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
              isError={!!(errors.password && touched.password)}
            />
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
            {loginError && shouldDisplayLoginError(errors, touched) && (
              <LoginError>{loginError}</LoginError>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

const LoginError = styled.p`
  color: tomato;
  text-align: center;
  font-weight: 600;
  margin-top: 24px;
`;

export default LoginForm;
