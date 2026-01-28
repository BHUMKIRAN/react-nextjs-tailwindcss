"use client";

import React, { useEffect, useState, useRef } from 'react';
import BidForm from '@/components/BidForm';
import BidHistory from '@/components/BidHistory';

interface AuctionData {
  currentPrice: number;
  highestBidder: string;
  itemName: string;
}

interface Bid {
  id: number;
  bidder: string;
  amount: number;
}

export default function Home() {
  const [auction, setAuction] = useState<AuctionData>({
    currentPrice: 0,
    highestBidder: 'Loading...',
    itemName: 'Loading...'
  });
  const [bids, setBids] = useState<Bid[]>([]);
  const [connected, setConnected] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  // 1. Initial Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionRes = await fetch('http://localhost:3001/auction');
        const auctionData = await auctionRes.json();
        setAuction(auctionData);

        const bidsRes = await fetch('http://localhost:3001/bids?_sort=id&_order=desc'); // Get latest first
        const bidsData = await bidsRes.json();
        setBids(bidsData);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };
    fetchData();
  }, []);

  // 2. WebSocket Logic
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'BID_UPDATED') {
        const { currentPrice, highestBidder } = data.payload;
        setAuction(prev => ({ ...prev, currentPrice, highestBidder }));

        // Trigger flash effect
        setPriceFlash(true);
        setTimeout(() => setPriceFlash(false), 1000);
      }

      if (data.type === 'NEW_BID_HISTORY') {
        setBids(prev => [data.payload, ...prev]);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header / Status */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {auction.itemName} Auction
          </h1>
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
              {connected ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Main Price Display */}
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg mb-2">Current Highest Bid</p>
          <div
            className={`text-8xl font-black transition-all duration-300 transform ${priceFlash ? 'text-green-400 scale-110' : 'text-white'
              }`}
          >
            ${auction.currentPrice.toLocaleString()}
          </div>
          <p className="mt-4 text-xl text-blue-300">
            Held by: <span className="font-bold text-white">{auction.highestBidder}</span>
          </p>
        </div>

        {/* content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BidForm currentPrice={auction.currentPrice} socket={socket} />
          <BidHistory bids={bids} />
        </div>

      </div>
    </main>
  );
}