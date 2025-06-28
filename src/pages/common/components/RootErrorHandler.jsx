import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@/pages/error/components/ErrorPage';

const RootErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};

export default RootErrorBoundary;
