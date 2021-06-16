import React from 'react';

import css from '@emotion/css';
import styled from '@emotion/styled';

import { ReactNode } from 'react';
import { ButtonTheme, ButtonSize, ButtonStyleProps } from './types';

export interface IButtonProps {
  onClick: (any: any) => any;
  buttonTheme: ButtonTheme;
  size: ButtonSize;
  children: ReactNode;
  disabled?: boolean;
  type?: 'imgIcon' | 'svgIcon';
}

// theme size 외에 option의 필요성 고민, 각 element 별로 필요한 옵션 요소들이 있음.
// disabled, focus, checked, 이 속성들은 앞에 theme와 별개로 영향을 미친다고 봐야함
// override 되는 요소들에 대한 고민,
// 테마 여러개 보여주기. 이름까지 같이 보여주면 좋을듯
// 헤딩 요소 처리할 것. 웹 접근성, spa에서는 어떻게 처리하는지?
export function Button({
  disabled,
  children,
  buttonTheme,
  size,
  onClick,
}: IButtonProps): React.ReactElement {
  const sizeStyle = sizeStyleList[size];
  const themeStyle = themeStyleList[buttonTheme];

  return (
    <ButtonWrapper
      disabled={disabled}
      type="button"
      onClick={onClick}
      sizeStyle={sizeStyle}
      themeStyle={themeStyle}
    >
      {children}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<ButtonStyleProps>`
  ${(props: any) => props.sizeStyle}
  ${(props: any) => props.themeStyle}
  &:disabled {
    cursor: default;
  }
`;

Button.defaultProps = {
  buttonTheme: ButtonTheme.Default,
  size: ButtonSize.Full,
};

const sizeStyleList: { [index: string]: any } = {
  [ButtonSize.Icon]: css`
    width: 20px;
    height: 20px;
  `,
  [ButtonSize.Small]: css`
    width: 30%;
    height: 30%;
  `,
  [ButtonSize.Medium]: css`
    width: 50%;
    height: 50%;
  `,
  [ButtonSize.Large]: css`
    width: 70%;
    height: 70%;
  `,
  [ButtonSize.Full]: css`
    width: 100%;
    height: 100%;
  `,
};

export const themeStyleList: { [index: string]: any } = {
  [ButtonTheme.Default]: css`
    background-color: lightgray;
  `,
  [ButtonTheme.Dark]: css`
    background-color: grey;
  `,
  [ButtonTheme.Empty]: css``,
  [ButtonTheme.EditorToolBar]: css`
    order: 0 none;
    background-color: transparent;
    cursor: pointer;
    font-size: 12px;
    line-height: 1.5;
    font-family: 'NotoSansKR', sans-serif;
    color: #333;
    letter-spacing: -0.2px;
    display: block;
    min-width: 52px;
    text-align: center;
    span:first-of-type {
      text-indent: -9999px;
      display: inline-block;
      overflow: hidden;
      font-size: 0;
      line-height: 0;
      width: 24px;
      height: 24px;
    }
    span:last-of-type {
      display: block;
      padding-top: 1px;
      font-size: 11px;
      line-height: 17px;
      color: #495057;
    }
  `,
  [ButtonTheme.TextToolBar]: css`
    font-size: 0;
    line-height: 0;
  `,
  [ButtonTheme.Blue]: css`
    display: inline-block;
    width: 120px;
    height: 40px;
    border: 1px solid #0057fe;
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
    background-color: #0057fe;
    vertical-align: top;
    text-align: center;
    &:disabled {
      background-color: #dee2e6;
      border: 1px solid #dee2e6;
      color: #fff;
    }
  `,
  [ButtonTheme.Gray]: css`
    display: inline-block;
    width: 120px;
    height: 40px;
    border: 1px solid #adb5bd;
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
    background-color: #adb5bd;
    vertical-align: top;
    text-align: center;
    &:disabled {
      background-color: #dee2e6;
      border: 1px solid #dee2e6;
      color: #fff;
    }
  `,
};
