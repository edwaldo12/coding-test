import { Box } from '@mui/material';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#F8F8F8',
      }}
    >
      <Component {...pageProps} />;
    </Box>
  );
}
