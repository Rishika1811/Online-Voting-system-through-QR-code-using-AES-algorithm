import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const UserDetails = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/qr/decrypt/${token}`
      );
      setUser(res.data.user);
    };
    fetchUser();
  }, [token]);

  const handleSendOtp = async () => {
    await axios.post("http://localhost:5000/api/otp/send", {
      voterId: user.voterId,
    });
    setSent(true);
  };

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/api/otp/verify", { voterId: user.voterId, otp }, {withCredentials: true});
    if (res.data.success) {
      localStorage.setItem("isAuthenticated", "true");
      navigate(`/vote/${user.voterId}`);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1a365d]">User Details</h1>
          <p className="mt-2 text-gray-600">Verify your identity to continue</p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Please verify your information is correct
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Full Name:</p>
                    <p className="text-base">{user.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Age:</p>
                    <p className="text-base">{user.age}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Gender:</p>
                    <p className="text-base">{user.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email:</p>
                    <p className="text-base">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Voter ID:</p>
                    <p className="text-base">{user.voterId}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  {!sent ? (
                    <div className="flex justify-center">
                      <Button
                        onClick={handleSendOtp}
                        disabled={isLoading}
                        className="bg-[#1a365d] hover:bg-[#0f203d] text-white"
                      >
                        {isLoading ? "Sending..." : "Send Verification Code"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center mb-2">
                        <p className="text-sm text-gray-600">
                          Enter the verification code sent to your email
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <Input
                          type="number"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="w-40 text-center tracking-widest text-lg"
                        />
                      </div>

                      <div className="flex justify-center">
                        <Button
                          onClick={handleVerify}
                          disabled={isLoading || otp.length < 6}
                          className="bg-[#1a365d] hover:bg-[#0f203d] text-white"
                        >
                          {isLoading ? "Verifying..." : "Verify OTP"}
                          {!isLoading && otp.length === 6 && (
                            <Check className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p>Loading user information...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
