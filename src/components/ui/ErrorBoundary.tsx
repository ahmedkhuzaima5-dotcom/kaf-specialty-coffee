import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

/**
 * Isolates rendering faults inside interactive sections with a quiet-luxury recovery UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected interruption occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('KAF UI boundary caught error:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, message: '' });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="rounded-2xl border border-[#C89B65]/25 bg-[#171311] p-8 text-center"
        >
          <p className="font-serif italic text-lg text-[#C89B65]">
            A brief pause in ritual
          </p>
          <h3 className="mt-2 font-sans text-xl font-medium text-[#F3EDE2]">
            {this.props.fallbackTitle ?? 'Something needs a fresh pour'}
          </h3>
          <p className="mx-auto mt-2 max-w-[48ch] text-sm text-[#B5A898]">
            {this.state.message}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#C89B65]/40 bg-[#221C18] px-6 py-2 text-xs font-medium tracking-[0.08em] uppercase text-[#F3EDE2] transition hover:border-[#C89B65] active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
