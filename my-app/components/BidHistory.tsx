"use client";

import React, { useRef } from 'react';

interface Bid {
    id: number;
    bidder: string;
    amount: number;
}

interface BidHistoryProps {
    bids: Bid[];
}

const BidHistory: React.FC<BidHistoryProps> = ({ bids }) => {
    const listRef = useRef<HTMLUListElement>(null);

    // Auto-scroll to top or handle new additions animation if needed
    // For now, simple list rendering

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 h-96 overflow-hidden flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">Live Bid History</h2>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {bids.length === 0 ? (
                    <p className="text-gray-400 text-center mt-10">No bids yet. Be the first!</p>
                ) : (
                    <ul ref={listRef} className="space-y-2">
                        {bids.map((bid) => (
                            <li key={bid.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded hover:bg-gray-700 transition animate-fade-in-down">
                                <span className="font-medium text-blue-300">{bid.bidder}</span>
                                <span className="font-bold text-green-400">${bid.amount.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BidHistory;
