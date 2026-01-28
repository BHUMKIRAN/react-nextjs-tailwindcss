"use client";

import React, { useState } from 'react';

interface BidFormProps {
    currentPrice: number;
    socket: WebSocket | null;
}

const BidForm: React.FC<BidFormProps> = ({ currentPrice, socket }) => {
    const [amount, setAmount] = useState<string>('');
    const [bidder, setBidder] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            setError('Connection lost. Please refresh.');
            return;
        }

        const bidValue = Number(amount);
        if (!bidder.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (isNaN(bidValue) || bidValue <= currentPrice) {
            setError(`Bid must be higher than $${currentPrice}`);
            return;
        }

        // Send bid
        const message = JSON.stringify({
            type: 'PLACE_BID',
            payload: { bidder, amount: bidValue }
        });
        socket.send(message);

        // Reset
        setAmount('');
        setError('');
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-100">Place Your Bid</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Your Name</label>
                    <input
                        type="text"
                        value={bidder}
                        onChange={(e) => setBidder(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Bid Amount ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500 transition"
                        placeholder={`Higher than ${currentPrice}`}
                    />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={!amount || Number(amount) <= currentPrice}
                    className={`w-full font-bold py-3 rounded transition ${!amount || Number(amount) <= currentPrice
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        }`}
                >
                    Place Bid
                </button>
            </form>
        </div>
    );
};

export default BidForm;
