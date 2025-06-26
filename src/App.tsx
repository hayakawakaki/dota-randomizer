import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeviceProvider } from "@/hooks/device";
import { HeroesComponent } from "@features/heroes";

import Layout from "@components/Layout";
import Loading from "@components/Loading";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DeviceProvider>
        <Layout>
          <ErrorBoundary fallback={<div>Failed to load heroes</div>}>
            <Suspense fallback={<Loading />}>
              <HeroesComponent />
            </Suspense>
          </ErrorBoundary>
        </Layout>
      </DeviceProvider>
    </QueryClientProvider>
  );
}

export default App;
