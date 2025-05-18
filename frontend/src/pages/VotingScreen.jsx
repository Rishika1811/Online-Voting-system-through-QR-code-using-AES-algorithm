import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Vote } from "lucide-react";
import { useParams } from "react-router-dom";

const VotingScreen = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const voterId = useParams().voterId;

  useEffect(() => {
    const fetchStatusAndCandidates = async () => {
      setIsLoading(true); 
      try {
        const res = await axios.get(
          `http://localhost:5000/api/vote/status/${voterId}`
        );

        if (res.data.hasVoted) {
          navigate("/results");
        } else {
          const candidatesRes = await axios.get(
            "http://localhost:5000/api/vote/candidates", {withCredentials: true}
          );
          setCandidates(candidatesRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchStatusAndCandidates();
  }, [voterId, navigate]);

  const handleVote = async () => {
    if (!selectedCandidate) return; // Ensure a candidate is selected

    setIsSubmitting(true); // Start submitting
    try {
      await axios.post(
        "http://localhost:5000/api/vote/cast",
        { voterId, candidateId: selectedCandidate },
        {withCredentials: true}
      );
      navigate("/results");
    } catch (error) {
      console.error("Error submitting vote:", error);
      // Optionally handle error, show message, etc.
    } finally {
      setIsSubmitting(false); // Stop submitting
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1a365d]">Cast Your Vote</h1>
          <p className="mt-2 text-gray-600">
            Select a candidate below to cast your vote
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Vote className="mr-2" />
              Available Candidates
            </CardTitle>
            <CardDescription>Select one candidate to cast your vote</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-10 text-center">
                <p>Loading candidates...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCandidate === candidate._id
                        ? "bg-[#1a365d] text-white border-[#1a365d]"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCandidate(candidate._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{candidate.name}</h3>
                        <p
                          className={`${
                            selectedCandidate === candidate._id
                              ? "text-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          {/* {candidate.party} Party name */}
                        </p>
                      </div>
                      {selectedCandidate === candidate._id && (
                        <Check className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                ))}

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleVote}
                    disabled={!selectedCandidate || isSubmitting}
                    className="bg-[#1a365d] hover:bg-[#0f203d] px-8 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Vote"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VotingScreen;
