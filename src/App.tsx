import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
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
        reverseOrder={false}
        gutter={16}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 6000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            borderRadius: "8px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
