'use client';

import { getAccessToken } from '@calimero-is-near/calimero-p2p-sdk';
import { JsonWebToken } from '../types/types';

export const APP_URL = 'app-url';
export const CONTEXT_ID = 'context-id';
export const APPLICATION_ID = 'application-id';
export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';
export const IDENTITY = 'identity';

export const clearAppEndpoint = () => {
  localStorage.removeItem(APP_URL);
};

export const clearApplicationId = () => {
  localStorage.removeItem(APPLICATION_ID);
};

export const setAppEndpointKey = (url: string) => {
  if (process.env['NEXT_PUBLIC_ENDPOINT_URL']) {
    localStorage.setItem(
      APP_URL,
      JSON.stringify(process.env['NEXT_PUBLIC_ENDPOINT_URL']),
    );
  } else {
    localStorage.setItem(APP_URL, JSON.stringify(url));
  }
};

export const getAppEndpointKey = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    let url: string = JSON.parse(localStorage.getItem(APP_URL));
    if (url) {
      return url;
    }
  }
  return null;
};

export const setIdentity = (url: string) => {
  if (process.env['NEXT_PUBLIC_IDENTITY']) {
    localStorage.setItem(
      IDENTITY,
      JSON.stringify(process.env['NEXT_PUBLIC_IDENTITY']),
    );
  } else {
    localStorage.setItem(IDENTITY, JSON.stringify(url));
  }
};

export const getIdentity = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    let url: string = JSON.parse(localStorage.getItem(IDENTITY));
    if (url) {
      return url;
    }
  }
  return null;
};

export const getContextId = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storageContextId: string = JSON.parse(
      localStorage.getItem(CONTEXT_ID),
    );
    if (storageContextId) {
      return storageContextId;
    }
  }
  return null;
};

export const setContextId = (contextId: string) => {
  if (process.env['NEXT_PUBLIC_CONTEXT_ID']) {
    localStorage.setItem(
      CONTEXT_ID,
      JSON.stringify(process.env['NEXT_PUBLIC_CONTEXT_ID']),
    );
  } else {
    localStorage.setItem(CONTEXT_ID, JSON.stringify(contextId));
  }
};

export const getApplicationId = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storageApplicationId = localStorage.getItem(APPLICATION_ID);
    if (storageApplicationId) {
      return JSON.parse(storageApplicationId);
    }
  }
  return null;
};

export const setStorageApplicationId = (applicationId: string) => {
  if (process.env['NEXT_PUBLIC_APPLICATION_ID']) {
    localStorage.setItem(
      APPLICATION_ID,
      JSON.stringify(process.env['NEXT_PUBLIC_APPLICATION_ID']),
    );
  } else {
    localStorage.setItem(APPLICATION_ID, JSON.stringify(applicationId));
  }
};

export const getJWTObject = (): JsonWebToken | null => {
  const token = getAccessToken();
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Invalid JWT token');
    return;
  }
  const payload = JSON.parse(atob(parts[1]));
  return payload;
};

export const getJWT = (): string | null => {
  return getAccessToken();
};

export const clearJWT = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
