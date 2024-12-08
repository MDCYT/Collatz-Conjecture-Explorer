import React, { Suspense, lazy } from "react";
import { useCollatzStore } from "./store/useCollatzStore";

const Header = lazy(() =>
  import("./components/Header").then((module) => ({ default: module.Header }))
);
const InputPanel = lazy(() =>
  import("./components/InputPanel").then((module) => ({
    default: module.InputPanel,
  }))
);
const VisualizationPanel = lazy(() =>
  import("./components/VisualizationPanel").then((module) => ({
    default: module.VisualizationPanel,
  }))
);
const StatsPanel = lazy(() =>
  import("./components/StatsPanel").then((module) => ({
    default: module.StatsPanel,
  }))
);

const App: React.FC = () => {
  const { isDarkMode } = useCollatzStore();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                Loading...
              </p>
            </div>
          }
        >
          <Header />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <InputPanel />
                <StatsPanel />
              </div>
              <VisualizationPanel />
            </div>
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
