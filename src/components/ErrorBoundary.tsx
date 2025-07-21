import * as React from 'react';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
const messageConfig = {
  success: {
    color: 'text-green-500',
    image: 'app-launch-green',
  },
  failure: {
    color: 'text-red-600',
    image: 'crashed-error-red',
  },
} as const;

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { color, image } = messageConfig.failure;

      return (
        this.props.fallback ?? (
          <div className="text-red-600 p-4">
            <div
              className={`${color} flex flex-col items-center justify-center`}
            >
              <img
                src={`public/illustrations/${image}.svg`}
                alt="Page Not Found"
                className="max-w-md h-60 w-auto"
              />
              <h2>Something went wrong.</h2>
              <pre>{this.state.error?.message}</pre>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
