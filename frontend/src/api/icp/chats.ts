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
  console.log('response', responseJson);
  return responseJson;
  // return await response.json();
}

// API URL 상수화
export const CONTEXT_API = {
  GET_Chats: (userId: string, contextId: string) =>
    `${API_BASE_URL}/chats?userId=${userId}&contextId=${contextId}`,
};

// API 요청 함수들

export async function fetchChats(userId: string, contextId: string) {
  const endpoint = `${CONTEXT_API.GET_Chats(userId, contextId)}`;
  return await apiRequest(endpoint);
}
