const jsonServer = require('json-server');
const WebSocket = require('ws');
const path = require('path');

// 1. Setup JSON Server (REST)
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Start HTTP Server on port 3001
const PORT = 3001;
const httpServer = server.listen(PORT, () => {
    console.log(`JSON Server & WS running on http://localhost:${PORT}`);
});

// 2. Setup WebSocket Server (WS)
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'PLACE_BID') {
            const { bidder, amount } = data.payload;
            const db = router.db; // Access the lowdb instance

            // LOGIC: Only update if bid is higher
            const currentAuction = db.get('auction').value();

            if (amount > currentAuction.currentPrice) {
                // UPDATE db.json
                db.set('auction.currentPrice', amount).write();
                db.set('auction.highestBidder', bidder).write();
                const newBid = { id: Date.now(), bidder, amount };
                db.get('bids').push(newBid).write();

                // BROADCAST to all clients
                const response = JSON.stringify({
                    type: 'BID_UPDATED',
                    payload: { currentPrice: amount, highestBidder: bidder }
                });

                const historyResponse = JSON.stringify({
                    type: 'NEW_BID_HISTORY',
                    payload: newBid
                });

                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(response);
                        client.send(historyResponse);
                    }
                });
            }
        }
    });
});