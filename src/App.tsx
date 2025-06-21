import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
// import { Toaster } from "react-hot-toast";
import { API } from "./constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API.STALE_TIME,
    },
  },
});

function App() {
  // RouterProvider is the new API introduced in React Router v6.4+
  // It leverages the Data API features including loaders and actions
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        duration={3000}
        closeButton
        theme="light"
        richColors
        toastOptions={{
          className: "!text-sm !max-w-xs !px-4 !py-3 !rounded-lg",
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
