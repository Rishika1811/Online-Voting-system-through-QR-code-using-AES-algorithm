import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
  
      localStorage.removeItem("isAuthenticated");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  return (
    <nav className="w-full bg-[#1a365d] py-4 px-6 sm:px-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-white text-2xl font-bold">SecureX</h1>
        </Link>
        
        {isAuthenticated && <Button 
          variant="outline" 
          onClick = {handleLogout}
          className="bg-white text-[#1a365d] hover:bg-gray-100 font-medium"
          asChild
        >
          Logout
        </Button>}
      </div>
    </nav>
  );
};

export default Navbar;