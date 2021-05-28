export enum ButtonTheme {
  Default = 'DEFAULT',
  Dark = 'DARK',
  Empty = 'EMPTY',
  EditorToolBar = 'TOOLBAR',
  TextToolBar = 'TEXTTOOLBAR',
  Blue = 'BLUE',
  Gray = 'GRAY',
}

export enum ButtonSize {
  Icon = 'ICON',
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
  Full = 'FULL',
}

export interface ButtonStyleProps {
  sizeStyle: ButtonSize;
  themeStyle: ButtonTheme;
}
