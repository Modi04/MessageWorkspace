const API_BASE_URL = process.env['NEXT_PUBLIC_API_BASE_URL'];

// 공통 fetch 요청 처리 함수
async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const response = await fetch(`${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.text();
    console.error(
      `Error: ${response.status} ${response.statusText}\n${errorData}`,
    );
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const responseJson = await response.json();
  return responseJson;
  // return await response.json();
}

// API URL 상수화
export const CONTEXT_API = {
  HEALTH_CHECK: () => `${API_BASE_URL}/`,
  GET_USER_CONTEXTS: (address: string) =>
    `${API_BASE_URL}/contexts/user?userAddress=${address}`,
  GET_CONTEXT_MEMBERS: (contextId: string) =>
    `${API_BASE_URL}/contexts/members?contextId=${contextId}`,
  GET_USER_CONTEXT_IDENTITIES: (address: string, context: string) =>
    `${API_BASE_URL}/contexts/identities?userAddress=${address}&contextId=${context}`,
  CREATE_USER_CONTEXT_IDENTITIES: () => `${API_BASE_URL}/contexts/identity`,
};

// API 요청 함수들

export async function fetchHealth() {
  const endpoint = `${CONTEXT_API.HEALTH_CHECK()}`;
  try {
    return await apiRequest(endpoint);
  } catch (error) {
    console.error('Error in fetchHealth:', error);
    return null; // 기본값 반환
  }
}

export async function fetchContexts(address: string) {
  const endpoint = `${CONTEXT_API.GET_USER_CONTEXTS(address)}`;
  try {
    return await apiRequest(endpoint);
  } catch (error) {
    console.error(`Error in fetchContexts for address ${address}:`, error);
    return []; // 빈 배열 반환
  }
}

export async function fetchIdentities(address: string, context: string) {
  try {
    return await apiRequest(
      `${CONTEXT_API.GET_USER_CONTEXT_IDENTITIES(address, context)}`,
    );
  } catch (error) {
    console.error(
      `Error in fetchIdentities for address ${address} and context ${context}:`,
      error,
    );
    return []; // 빈 배열 반환
  }
}

export async function fetchMembers(contextId: string) {
  const endpoint = `${CONTEXT_API.GET_CONTEXT_MEMBERS(contextId)}`;
  try {
    return await apiRequest(endpoint);
  } catch (error) {
    console.error(`Error in fetchMembers for contextId ${contextId}:`, error);
    return []; // 빈 배열 반환
  }
}

export async function createIdentity() {
  const endpoint = `${CONTEXT_API.CREATE_USER_CONTEXT_IDENTITIES()}`;
  try {
    return await apiRequest(endpoint);
  } catch (error) {
    console.error(`Error in fetchMembers for contextId:`, error);
    return []; // 빈 배열 반환
  }
}
