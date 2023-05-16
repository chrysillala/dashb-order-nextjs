import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { GlobalProvider } from "@/context/GlobalContext";
import { AuthProvider } from "@/context/AuthContext";

import ProtectRoute from "@/components/ProtectRoute";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
    </AuthProvider>
  );
}
