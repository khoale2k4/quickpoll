import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { ChevronLeft } from "lucide-react";

const PollsList = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch(`${(process.env.API_HOST || 'http://localhost:3000')}/polls`);
                const data = await response.json();
                setPolls(data.polls);
            } catch (error) {
                console.error('Error fetching polls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!polls.length) {
        return <div>No polls available</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Vote on Poll</h1>
            </div>

            <div className="space-y-4">
                {polls.map((poll) => (
                    <div key={poll.id} className="rounded-lg border border-gray-100 p-4 hover:border-gray-200 transition">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{poll.title}</span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-blue-600">
                                    {poll.options.reduce((sum, option) => sum + option.votes, 0)} votes
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Created {new Date(poll.createdAt).toLocaleString()}</span>
                        </div>
                        <Link to={`/poll/${poll.id}`} className="mt-3 text-blue-500 flex items-center gap-1">
                            View Poll
                            <ChevronRight size={16} />
                        </Link>
                        <Link to={`/poll/${poll.id}/results`} className="mt-3 text-blue-500 flex items-center gap-1">
                            View Poll's Result
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PollsList;
