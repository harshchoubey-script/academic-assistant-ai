import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({
  children,
}: Props) {
  const auth = useAuth();

  console.log(auth);

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;