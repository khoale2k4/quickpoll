import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, RefreshCw, Share2 } from "lucide-react";
import axios from "axios";
import io from 'socket.io-client';

function PollResults() {
    const { pollId } = useParams();
    const [results, setResults] = useState(null);
    const [totalVotes, setTotalVotes] = useState(0);
    const [pollDetails, setPollDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchResult = async () => {
        try {
            setPollDetails(null);
            const response = await axios.get(`${process.env.API_HOST || 'http://localhost:3000'}/polls/${pollId}`,);
            if (response.status === 200) {
                const data = response.data;
                setPollDetails(data.poll);
            }
        } catch (error) {
            console.log("Có lỗi xảy ra")
        }
    }

    useEffect(() => {
        const socket = io((process.env.API_HOST || 'http://localhost:3000'));

        socket.on('pollResults', (polls) => {
            console.log('Updated poll results:', polls);
            const poll = polls.find(p => p.id == pollId);

            console.log(poll);
            if (poll) {
                setPollDetails(poll);
                setTotalVotes(poll.options.reduce((sum, option) => sum + option.votes, 0));
            }
        });

        socket.emit('joinPoll', pollId);

        fetchResult();
        setLoading(false);

        return () => {
            socket.disconnect();
        };
    }, [pollId]);

    if (loading || !pollDetails) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const calculatePercentage = (votes) => {
        const total = pollDetails.options.reduce((sum, option) => sum + option.votes, 0);
        if(total === 0) return 0;
        return ((votes / total) * 100).toFixed(1);
    };


    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Poll Results</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchResult}
                        className="p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                        title="Refresh results"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${(process.env.REACT_APP_HOST || 'http://localhost:3001')}/poll/${pollId}/results`).then(() => {
                                alert('Link copied to clipboard!');
                            });
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                        title="Share poll"
                    >
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 mb-1">{pollDetails.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Poll #{pollId}</span>
                    <span>•</span>
                    <span>{totalVotes} votes</span>
                    <span>•</span>
                    <span>Created {new Date(pollDetails.createdAt).toLocaleString()}</span>
                </div>
            </div>

            <div className="mb-8 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pollDetails.options} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="text" type="category" width={100} axisLine={false} tickLine={false} />
                        <Tooltip
                            formatter={(value) => [`${value} votes (${calculatePercentage(value)}%)`, 'Votes']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                        />
                        <Bar dataKey="votes" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-3">
                {pollDetails && pollDetails.options && pollDetails.options.map((option, index) => (
                    <div key={index} className="rounded-lg border border-gray-100 p-4 hover:border-gray-200 transition">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{option.text}</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-blue-600">{option.votes}</span>
                                <span className="text-sm text-gray-500">votes</span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${calculatePercentage(option.votes)}%` }}
                            ></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 text-right">{calculatePercentage(option.votes)}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PollResults;