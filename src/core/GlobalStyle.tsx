import * as React from 'react';

import { css, Global } from '@emotion/react';

export default function GlobalStyle(): JSX.Element {
  return (
    <Global
      styles={css`
        /* reset */
        body,
        div,
        dl,
        dt,
        dd,
        ul,
        ol,
        li,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        pre,
        code,
        form,
        fieldset,
        legend,
        textarea,
        p,
        blockquote,
        th,
        td,
        input,
        select,
        button {
          margin: 0;
          padding: 0;
        }
        fieldset,
        img {
          border: 0 none;
        }
        dl,
        ul,
        ol,
        menu,
        li {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: '';
          content: none;
        }
        input,
        select,
        textarea,
        button {
          vertical-align: middle;
          outline: 0 none;
        }
        input::-ms-clear {
          display: none;
        }
        input::placeholder {
          color: #adb5bd;
        }
        textarea::placeholder {
          color: #ced4da;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          background-color: #fff !important;
          -webkit-text-fill-color: #212529 !important;
          transition-property: background-color, color;
          transition-delay: 9999s;
        }
        button {
          border: 0 none;
          background-color: transparent;
          cursor: pointer;
        }
        body {
          background-color: #f8f9fa;
        }
        body,
        th,
        td,
        a,
        input,
        select,
        textarea,
        button {
          line-height: 1.5;
          font-family: 'NotoSansKR', sans-serif;
          color: #333;
          letter-spacing: -0.2px;
        }
        a {
          text-decoration: none;
        }
        a:active,
        a:hover {
          text-decoration: underline;
        }
        a:active {
          background-color: transparent;
        }
        roadAddr,
        caption,
        cite,
        code,
        dfn,
        em,
        var {
          font-style: normal;
          font-weight: normal;
        }
        ::selection {
          background-color: #e6eeff;
        }
      `}
    />
  );
}
