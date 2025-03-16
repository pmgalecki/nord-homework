import { Field, ErrorMessage, FieldProps } from 'formik';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextInputProps {
  name: string;
  placeholder: string;
  label: string;
}

function TextInput({
  name,
  placeholder,
  label,
  ...rest
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name}>
        {({ field }: FieldProps) => (
          <div>
            <Input {...field} {...rest} placeholder={placeholder} />
          </div>
        )}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

const Input = styled.input`
  padding: 8px;
  width: 50%;

  border: 1px solid #333;
`;

export default TextInput;
