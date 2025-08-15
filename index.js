import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// MCPサーバーのインスタンスを作成
const server = new Server({
  name: 'mastra-test-server',
  version: '1.0.0.0',
});

// ツール一覧を提供
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
      },
      {
        name: 'get_repo_info',
        description: 'Get basic repository information',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

// ツールの実行ハンドラー
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case 'hello':
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${args?.name || 'World'}!`
          }
        ]
      };
      
    case 'get_repo_info':
      return {
        content: [
          {
            type: 'text',
            text: 'Repository: mastra-test\nStatus: Active\nTools: 2 available'
          }
        ]
      };
      
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// リソース一覧を提供
server.setRequestHandler('resources/list', async () => {
  return {
    resources: [
      {
        uri: 'file:///README.md',
        name: 'README',
        description: 'Project documentation',
        mimeType: 'text/markdown'
      }
    ]
  };
});

// トランスポートを設定（stdio）
const transport = new StdioServerTransport();
server.connect(transport);

console.log('MCP Server started successfully');
