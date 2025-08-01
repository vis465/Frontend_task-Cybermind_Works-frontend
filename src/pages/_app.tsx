import { MantineProvider } from '@mantine/core';
// import {satoshi} from "../../public/fonts/Satoshi-Regular.woff2"
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';

// For Pages Router (_app.tsx)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div >
      <MantineProvider
        theme={{
          fontFamily: 'var(--font-satoshi), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          headings: {
            fontFamily: 'var(--font-satoshi), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  );
}