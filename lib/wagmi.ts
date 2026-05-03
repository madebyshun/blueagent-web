import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "";

export const wagmiConfig = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: true,
  connectors: [
    coinbaseWallet({ appName: "BlueAgent", preference: "eoaOnly" }),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
