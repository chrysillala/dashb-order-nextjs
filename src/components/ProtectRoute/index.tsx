import React, { FC, ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: ReactNode;
}

const ProtectRoute: FC<Props | any> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (
    loading ||
    (!isAuthenticated && window.location.pathname !== "/sign-in")
  ) {
    return (
      <div>
        Not Authorized. Please sign-in{" "}
        <Link href="/sign-in" style={{ color: "#007FFF" }}>
          here
        </Link>
        .
      </div>
    );
  }

  return children;
};

export default ProtectRoute;
