import { SerializedStyles } from '@emotion/react';

export enum InputTheme {
  'Default' = 'DEFAULT',
  'Round' = 'ROUND',
}

export interface IInputProps {
  inputTheme: InputTheme;
  onChange: (event: any) => any;
  value: string | number | undefined;
  id: string | number;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export interface InputStyleProps {
  themeStyle: SerializedStyles;
}
