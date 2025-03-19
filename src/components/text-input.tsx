import { Field, ErrorMessage, FieldProps } from 'formik';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextInputProps {
  name: string;
  placeholder: string;
  label: string;
  isError: boolean;
}

function TextInput({
  name,
  placeholder,
  label,
  isError,
  ...rest
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <InputContainer>
      <Label $isError={isError} htmlFor={name}>
        {label}
      </Label>
      <Field id={name} name={name}>
        {({ field }: FieldProps) => (
          <Input
            $isError={isError}
            {...field}
            {...rest}
            placeholder={placeholder}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <span style={{ color: 'tomato' }}>{msg}</span>}
      />
    </InputContainer>
  );
}

const Label = styled.label<{ $isError?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${({ $isError }) => ($isError ? 'tomato' : '#a7a7a7')};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input<{ $isError?: boolean }>`
  padding: 8px 15px;
  border: 1px solid;
  border-color: ${({ $isError }) => ($isError ? 'tomato' : '#a7a7a7')};
  border-radius: 10px;
`;

export { TextInput };
