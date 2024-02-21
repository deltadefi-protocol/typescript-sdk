import WebSocket from 'ws';
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

        this.ws.on('open', () => {
            this.eventHandlers.open.forEach((handler) => handler());
        });

        this.ws.on('message', (data: WebSocket.Data) => {
            this.eventHandlers.message.forEach((handler) => handler(data));
        });

        this.ws.on('close', (code: number, reason: string) => {
            this.eventHandlers.close.forEach((handler) => handler({ code, reason }));
        });

        this.ws.on('error', (err: Error) => {
            this.eventHandlers.error.forEach((handler) => handler(err));
        });
    }

    public closeConnection() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Usage:
// sdk.on('open', () => console.log('Connection opened'));
// sdk.on('message', data => console.log('Received:', data));
// sdk.on('close', ({ code, reason }) => console.log(`Connection closed, code: ${code}, reason: ${reason}`));
// sdk.connectToMarketPair('ADAUSDX');
