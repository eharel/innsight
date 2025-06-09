import { useNavigate, useRouteError } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;
  
  return (
    <div>
      <h1>Oops! Page Not Found</h1>
      <p>We couldn't find the page you were looking for.</p>
      
      {error && (
        <div>
          <p>Error details:</p>
          <pre>{error instanceof Error ? error.message : String(error)}</pre>
        </div>
      )}
      
      <div>
        <button onClick={() => navigate("/")}>Go to Dashboard</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}
