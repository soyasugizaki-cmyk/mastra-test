import { Server } from '@modelcontextprotocol/sdk/server/index.js';

const server = new Server({
  name: 'mastra-test-server',
  version: '1.0.0.0',
});

server.listen();
