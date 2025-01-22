import {
  ClientApi,
  ClientMethod,
  ViewChats,
  CreateChat,
  ViewChatMessages,
  CreateChatMessages,
} from '../clientApi';
import { ApiResponse } from '../response';
import { Chat, JsonWebToken, Message } from '../../types/types';
import {
  JsonRpcClient,
  RequestConfig,
  RpcError,
  handleRpcError,
} from '@calimero-network/calimero-client/lib/';
import { AxiosHeader, createJwtHeader } from '../../crypto/crypto';
import { getAppEndpointKey, getJWTObject } from '../../utils/storage';
import { getNodeUrl } from '../../utils/node';

export function getJsonRpcClient() {
  return new JsonRpcClient(
    getAppEndpointKey()?.toString(),
    process.env['NEXT_PUBLIC_RPC_PATH'],
  );
}

function getConfigAndJwt() {
  const jwtObject: JsonWebToken = getJWTObject();
  const headers: AxiosHeader = createJwtHeader();
  if (!jwtObject) {
    return {
      error: { message: 'Failed to get JWT token', code: 500 },
    };
  }
  if (jwtObject.executor_public_key === null) {
    return {
      error: { message: 'Failed to get executor public key', code: 500 },
    };
  }

  const config: RequestConfig = {
    headers: headers,
  };

  return { jwtObject, config };
}

export class ClientApiDataSource implements ClientApi {
  async fetchChat(params: { chat_id: string }): ApiResponse<any> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().query<any, Chat>(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.VIEW_CHAT,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.fetchChat(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: response.result?.output ?? [],
      error: null,
    };
  }

  async fetchChats(): ApiResponse<any> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().query<any, Chat[]>(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.VIEW_USER_CHAT,
        argsJson: {
          user_id: jwtObject.executor_public_key,
          context_id: jwtObject.context_id,
        },
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.fetchChats();
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: response.result?.output ?? [],
      error: null,
    };
  }

  async fetchMessages(params: ViewChatMessages): ApiResponse<Message[]> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().query<
      ViewChatMessages,
      Message[]
    >(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.VIEW_MESSAGES,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.fetchMessages(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createChats(params: { id: string; name: string }): ApiResponse<any> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().mutate<CreateChat, Chat>(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.CREATE_CHAT,
        argsJson: { ...params, context: jwtObject.context_id },
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.createChats(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: response?.result?.output,
      error: null,
    };
  }

  async createMessages(params: {
    chat_id: string;
    content: string;
  }): ApiResponse<any> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().mutate<
      CreateChatMessages,
      Comment
    >(
      {
        contextId: jwtObject.context_id,
        method: ClientMethod.CREATE_MESSAGES,
        argsJson: { ...params, user_id: jwtObject.executor_public_key },
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.createMessages(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: response?.result,
      error: null,
    };
  }
}
