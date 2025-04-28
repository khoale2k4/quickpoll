import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, RefreshCw, Share2 } from "lucide-react";

function PollResults() {
    const { pollId } = useParams();
    const [results, setResults] = useState(null);
    const [pollDetails, setPollDetails] = useState({
        question: "What is your favorite programming language?",
        totalVotes: 0,
        createdAt: new Date().toLocaleDateString()
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const mockResults = [
                { option: "JavaScript", votes: 10, color: "#F7DF1E" },
                { option: "Python", votes: 15, color: "#3776AB" },
                { option: "Java", votes: 7, color: "#007396" },
                { option: "C#", votes: 5, color: "#68217A" },
            ];

            setResults(mockResults);
            setPollDetails(prev => ({
                ...prev,
                totalVotes: mockResults.reduce((sum, item) => sum + item.votes, 0)
            }));
            setLoading(false);
        }, 800);
    }, [pollId]);

    const refreshResults = () => {
        setLoading(true);
        setTimeout(() => {
            const updatedResults = results.map(item => ({
                ...item,
                votes: item.votes + Math.floor(Math.random() * 3)
            }));

            setResults(updatedResults);
            setPollDetails(prev => ({
                ...prev,
                totalVotes: updatedResults.reduce((sum, item) => sum + item.votes, 0)
            }));
            setLoading(false);
        }, 800);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const calculatePercentage = (votes) => {
        return ((votes / pollDetails.totalVotes) * 100).toFixed(1);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Poll Results</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={refreshResults}
                        className="p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                        title="Refresh results"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                        title="Share poll"
                    >
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 mb-1">{pollDetails.question}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Poll #{pollId}</span>
                    <span>•</span>
                    <span>{pollDetails.totalVotes} votes</span>
                    <span>•</span>
                    <span>Created {pollDetails.createdAt}</span>
                </div>
            </div>

            <div className="mb-8 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="option" type="category" width={100} axisLine={false} tickLine={false} />
                        <Tooltip
                            formatter={(value) => [`${value} votes (${calculatePercentage(value)}%)`, 'Votes']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                        />
                        <Bar dataKey="votes" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-3">
                {results.map((result, index) => (
                    <div key={index} className="rounded-lg border border-gray-100 p-4 hover:border-gray-200 transition">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{result.option}</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-blue-600">{result.votes}</span>
                                <span className="text-sm text-gray-500">votes</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${calculatePercentage(result.votes)}%` }}
                            ></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 text-right">{calculatePercentage(result.votes)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PollResults;