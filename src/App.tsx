import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeviceProvider } from "@/hooks/device";

import Layout from "@components/Layout";
import Loading from "@components/Loading";
import { HeroesComponent } from "@features/heroes";

function App() {
  const queryClient = new QueryClient();

  return (
    <DeviceProvider>
      <Layout>
        <ErrorBoundary fallback={<div>Failed to load heroes</div>}>
          <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>
              <HeroesComponent />
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </DeviceProvider>
  );
}

export default App;
