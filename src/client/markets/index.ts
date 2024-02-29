// import WebSocket from 'ws';
import { Api } from '../api';

type EventHandler = (data?: any) => void;

export class Markets extends Api {
    private baseWebSocketUrl: string;

    private ws: WebSocket | null = null;

    private eventHandlers: Record<string, EventHandler[]> = {
        open: [],
        message: [],
        close: [],
        error: [],
    };

    constructor(baseWebSocketUrl: string) {
        super();
        this.baseWebSocketUrl = baseWebSocketUrl;
    }

    public on(event: string, handler: EventHandler) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].push(handler);
        }
    }

    public subscribeToMarketPair(pair: string) {
        const url = `${this.baseWebSocketUrl}/markets/${pair}`;
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            this.eventHandlers.open.forEach((handler) => handler());
        };

        this.ws.onmessage = (event) => {
            this.eventHandlers.message.forEach((handler) => handler(event.data));
        };

        this.ws.onclose = (event) => {
            this.eventHandlers.close.forEach((handler) =>
                handler({ code: event.code, reason: event.reason }),
            );
        };

        this.ws.onerror = (event) => {
            this.eventHandlers.error.forEach((handler) => handler(event));
        };
    }

    public closeConnection() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Usage:
// Create a new instance of the Markets class
// const markets = new Markets('ws://your-base-url');

// // Add event handlers
// markets.on('open', () => console.log('Connection opened'));
// markets.on('message', data => console.log('Received:', data));
// markets.on('close', ({ code, reason }) => console.log(`Connection closed, code: ${code}, reason: ${reason}`));
// markets.on('error', err => console.error('Error:', err));

// // Subscribe to a market pair
// markets.subscribeToMarketPair('ADAUSDX');
