import styled from 'styled-components';

const Button = styled.button<{ disabled?: boolean }>`
  padding: 9px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'wait' : 'pointer')};
  color: white;
  background-color: var(--blue-grey);
  width: 100%;

  &:active {
    background-color: ${({ disabled }) =>
      disabled ? 'var(--blue-grey)' : 'var(--light-blue-grey)'};
    box-shadow: none;
  }
  box-shadow: var(--shadow-elevation-low);
  box-shadow: ${({ disabled }) =>
    disabled ? 'none' : 'var(--shadow-elevation-low)'};
  transition: all, 0.1s;
`;

export { Button };
