import Link from 'next/link';
import React from 'react';
import AvatarProfile from './Avatar';

const Dashboard = ({user}) => {
  return (
    <div className="dashboard p-4 space-y-6">
      {/* Welcome and User Info */}
      <div className="welcome-section bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-6">Hello, {user?.user?.first_name} 👋  Nice to see you again!</h2>
        
            <p className="text-gray-600 mb-2">Email: {user?.user?.email}</p>
            <AvatarProfile />
        
      </div>

      {/* Quick Links
      <div className="quick-links flex space-x-4">
        <Link href="/profile" className="btn">Profile</Link>
        <Link href="/mocktests" className="btn">Mock Tests</Link>
        <Link href="/results" className="btn">Results</Link>
      </div> */}

      {/* Recent Activity */}
      <div className="recent-activity bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <ul className="list-disc pl-5">
          <li>Mock Test 1 - 2023-06-10</li>
          <li>Mock Test 2 - 2023-06-08</li>
        </ul>
      </div>

      {/* Upcoming Mock Tests */}
      <div className="upcoming-tests bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Upcoming Mock Tests</h3>
        <ul className="list-disc pl-5">
          <li>Mock Test 3 - 2023-06-15</li>
          <li>Mock Test 4 - 2023-06-20</li>
        </ul>
      </div>

      {/* Progress Tracking */}
      <div className="progress-tracking bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Your Progress</h3>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div className="bg-blue-500 h-4 rounded" style={{ width: '70%' }}></div>
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <ul className="list-disc pl-5">
          <li>Reminder: Mock Test 3 on 2023-06-15</li>
          <li>New Feature: Improved results feedback</li>
        </ul>
      </div>

      {/* Performance Summary */}
      <div className="performance-summary bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Your Performance</h3>
        <p>Last Mock Test: 85%</p>
        <p>Average Score: 78%</p>
      </div>

      {/* Recent Results */}
      <div className="recent-results bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Recent Results</h3>
        <ul className="list-disc pl-5">
          <li>Mock Test 1: 80%</li>
          <li>Mock Test 2: 85%</li>
        </ul>
      </div>

      {/* Leaderboard */}
      <div className="leaderboard bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Leaderboard</h3>
        <p>Your Rank: 5</p>
      </div>

      {/* Resources and Recommendations */}
      <div className="resources bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Recommended Resources</h3>
        <ul className="list-disc pl-5">
          <li>Study Material 1</li>
          <li>Practice Test 1</li>
        </ul>
      </div>

      {/* Support and Help */}
      <div className="support bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Support and Help</h3>
        <Link href="/support" className="text-blue-500">Support</Link>
        <Link href="/faq" className="text-blue-500"> FAQ</Link>
      </div>
    </div>
  );
};

export default Dashboard;
