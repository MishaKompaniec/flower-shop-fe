import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ServerError {
  error: string;
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error
  );
}

export function parseApiError(error: unknown): {
  message: string;
  status?: number;
} {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as ServerError | undefined;
    return {
      message: data?.error || 'Unknown server error',
      status: typeof error.status === 'number' ? error.status : undefined,
    };
  }
  return { message: 'Unexpected error' };
}
