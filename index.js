import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'mastra-test-server',
  version: '1.0.0.0',
});

// 基本的なツールを定義
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'hello',
        description: 'A simple hello world tool',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name to greet'
            }
          }
        }
      }
    ]
  };
});

// ツールの実行ハンドラー
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'hello') {
    return {
      content: [
        {
          type: 'text',
          text: `Hello, ${request.params.arguments.name || 'World'}!`
        }
      ]
    };
  }
});

// トランスポートを設定
const transport = new StdioServerTransport();
server.connect(transport);
