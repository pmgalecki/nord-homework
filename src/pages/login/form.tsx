import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';

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
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
            />
            <ErrorMessage name="username" />

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="on"
            />
            <ErrorMessage name="password" />
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
