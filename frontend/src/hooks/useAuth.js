// hooks/useAuth.js
export const useAuth = () => {
    return localStorage.getItem("isAuthenticated") === "true";
  };
  