import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkTheme, XellarKitProvider } from '@xellar/kit';
import { xellarConfig } from '../config/config';

export default function Web3provider({ children }) {
  const config = xellarConfig;

  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>
          {children}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
