import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, ChevronLeft, AlertCircle, Share2 } from "lucide-react";
import { faL } from "@fortawesome/free-solid-svg-icons";

function VotePoll() {
    const { pollId } = useParams();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleFetchPoll = async () => {
        try {
            const response = await axios.get(`${(process.env.API_HOST || 'http://localhost:3000')}/polls/${pollId}`,);
            if (response.status === 200) {
                const data = response.data;
                setPoll(data.poll);
            } else {
                setError("Có lỗi xảy ra");
            }
            setLoading(false);
        } catch (error) {
            console.log("Có lỗi xảy ra");
        }
    }

    useEffect(() => {
        handleFetchPoll();
    }, [pollId]);

    const handleVote = async () => {
        if (selectedOption !== null) {
            setSubmitting(true);
            const response = await axios.post(`${(process.env.API_HOST || 'http://localhost:3000')}/polls/${pollId}/vote`, {
                optionId: poll.options[selectedOption].id
            });
            if (response.status === 200) {
            } else {
                setError("Có lỗi xảy ra");
            }

            setSubmitting(false);
            setTimeout(() => {
                navigate(`/poll/${pollId}/results`);
            }, 1000);
        }
    };

    if (loading || !poll) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg border border-red-200 flex items-center gap-3">
                <AlertCircle className="text-red-500" size={24} />
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Vote on Poll</h1>
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

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{poll.title}</h2>
                {/* {poll.description && (
                    <p className="text-gray-600 mb-2">{poll.description}</p>
                )} */}
                <div className="flex items-center text-sm text-gray-500">
                    {/* <span>Created by {poll.createdBy}</span> */}
                    {/* <span className="mx-2">•</span> */}
                    <span>Created {new Date(poll.createdAt).toLocaleString()}</span>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {poll.options.map((option, index) => (
                    <div
                        key={index}
                        className={`relative border rounded-lg p-4 transition cursor-pointer ${selectedOption === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                        onClick={() => setSelectedOption(index)}
                    >
                        <div className="flex items-center">
                            <div className={`w-5 h-5 mr-3 rounded-full border ${selectedOption === index
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                                }`}>
                                {selectedOption === index && (
                                    <CheckCircle className="text-white" size={20} />
                                )}
                            </div>
                            <label
                                htmlFor={`option-${index}`}
                                className="flex-grow cursor-pointer font-medium"
                            >
                                {option.text}
                            </label>
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="vote"
                                value={option}
                                checked={selectedOption === index}
                                onChange={() => setSelectedOption(index)}
                                className="sr-only" // Visually hidden but accessible
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleVote}
                disabled={selectedOption === null || submitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition ${selectedOption === null
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                    </div>
                ) : 'Submit Vote'}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
                You can only vote once in this poll
            </div>
        </div>
    );
}

export default VotePoll;