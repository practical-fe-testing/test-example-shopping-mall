import ReplayIcon from '@mui/icons-material/Replay';
import { Button } from '@mui/material';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

const ApiErrorFallback = ({ error, resetErrorBoundary }) => {
  if (!isAxiosError(error)) {
    throw error;
  }

  return (
    <Button
      variant="contained"
      endIcon={<ReplayIcon />}
      onClick={resetErrorBoundary}
    >
      다시시도
    </Button>
  );
};

const ApiErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const key = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ApiErrorFallback}
      onReset={reset}
      resetKeys={[key]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;
