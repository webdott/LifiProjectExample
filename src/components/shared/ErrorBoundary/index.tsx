import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: any;
  router: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: any) {
    super(props);

    // initialize state to have no Error
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log(error, errorInfo);
  }

  public render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
