import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="bg-[#0b1012]">
      <Head />
      <body className="w-full max-w-[600px] mx-auto ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
