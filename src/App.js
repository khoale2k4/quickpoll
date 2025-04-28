import React from "react";
import CreatePoll from "./views/CreatePoll/index";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VotePoll from "./views/VotePoll/index";
import PollResults from "./views/PollResult/index";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<CreatePoll />} />
          <Route path="/poll/:pollId" element={<VotePoll />} />
          <Route path="/poll/:pollId/results" element={<PollResults />} />
        </Routes>
      </div>
    </Router>
  );
}
