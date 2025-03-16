import { Formik, Form, FormikHelpers } from 'formik';

import TextInput from '../../components/text-input';

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

function LoginForm({ handleOnSubmit }: LoginFormProps) {
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
        {({ isSubmitting }) => (
          <Form>
            <TextInput
              name="username"
              placeholder="Enter your username"
              label="Username"
              type="text"
            />

            <TextInput
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
            />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
