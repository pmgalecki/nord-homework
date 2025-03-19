import { Formik, Form, FormikHelpers } from 'formik';

import { TextInput, Button } from '../../components';

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
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
