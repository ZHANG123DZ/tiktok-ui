import PusherJS from 'pusher-js';
import broadcastingService from '../services/broadcasting/broadcasting.service';

const socketClient = new PusherJS(import.meta.env.VITE_SOKETI_KEY, {
  cluster: '',
  wsHost: 'soketi.tiktokk.website',
  wsPort: 6001,
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authorizer: (channel, options) => {
    return {
      authorize: async (socketId, callback) => {
        try {
          const res = await broadcastingService.join({
            socket_id: socketId,
            channel_name: channel.name,
          });
          callback(null, res.data);
        } catch (error) {
          console.error('Authorize error:', error);
          callback(error, null);
        }
      },
    };
  },
});

export default socketClient;
