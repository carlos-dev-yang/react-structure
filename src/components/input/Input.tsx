import * as React from 'react';
import css from '@emotion/css';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

import { IInputProps, InputTheme, InputStyleProps } from './types';

export function Input({
  inputTheme,
  onChange,
  value,
  id,
  placeholder,
  disabled,
  maxLength,
}: IInputProps): React.ReactElement {
  const themeStyle = themeStyleList[inputTheme];

  const handleOnChange = (e: any) => {
    const inputValue = e.target.value;
    if (maxLength && inputValue.length > maxLength) {
      onChange(inputValue.substr(0, maxLength));
    } else {
      onChange(inputValue);
    }
  };

  return (
    <InputStyled
      type="text"
      id={`${id}`}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      themeStyle={themeStyle}
    />
  );
}

Input.defaultProps = {
  placeholder: 'placeholder default',
  inputTheme: InputTheme.Default,
  height: '36px',
};

const InputStyled = styled.input<InputStyleProps>`
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #e9ecef;
  color: #212529;
  ${(props) => props.themeStyle}
`;

const themeStyleList: { [index: string]: SerializedStyles } = {
  [InputTheme.Default]: css`
    position: relative;
    height: 28px;
    width: calc(100% - 38px);
    padding: 9px 18px;
    border-radius: 8px;
  `,
  [InputTheme.Round]: css`
    display: block;
    width: 100%;
    padding: 4px 69px 4px 8px;
    border-radius: 8px;
    line-height: 20px;
    box-sizing: border-box;
  `,
};
