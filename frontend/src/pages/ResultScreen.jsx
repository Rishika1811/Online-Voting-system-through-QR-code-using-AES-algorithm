import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";

const ResultScreen = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
        try {
        const res = await axios.get("http://localhost:5000/api/vote/live-count", {withCredentials: true});
        setResults(res.data.candidates);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();

    const intervalId = setInterval(fetchResults, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1a365d]">
            Election Results
          </h1>
          <p className="mt-2 text-gray-600">
            Live vote count
          </p>
          <p className="text-sm text-gray-500">
            (Results update automatically every 30 seconds)
          </p>
        </div>

        <Card className="shadow-md mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <BarChart className="mr-2 h-6 w-6" />
                Live Results
              </CardTitle>
              <CardDescription>Real-time vote tallies</CardDescription>
            </div>
            <div className="bg-[#1a365d] text-white px-3 py-1 rounded-full text-sm">
              Live
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center">
                <p>Loading results...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((candidate) => (
                  <div key={candidate._id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-lg">
                          {candidate.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {candidate.party}Party name
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{candidate.percentVotes}%</p>
                        <p className="text-gray-500 text-sm">
                          {candidate.voteCount} votes
                        </p>
                      </div>
                    </div>
                    <Progress value={candidate.percentVotes} className="h-2 border-1 border-black" />
                  </div>
                ))}

                <div className="flex justify-center mt-8">
                  <Button asChild>
                    <Link to="/">Back to Registration</Link>
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
export default ResultScreen;