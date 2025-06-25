import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeviceProvider } from "@/hooks/device";

import Layout from "@components/Layout";
import Loading from "@components/Loading";
import { useDevice } from "@/hooks/device/useDevice";
import { HeroesComponent } from "@features/heroes";

function App() {
  const { isDeviceAtLeast } = useDevice();
  const queryClient = new QueryClient();

  const isMobile = !isDeviceAtLeast("LAPTOP");

  return (
    <Layout>
      <ErrorBoundary fallback={<div>Failed to load heroes</div>}>
        <Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            <DeviceProvider>
              <HeroesComponent />
            </DeviceProvider>
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
