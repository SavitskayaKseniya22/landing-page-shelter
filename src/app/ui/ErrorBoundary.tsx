import { Component, type ReactNode } from "react";
import { ErrorView, errorPageStyles } from "@/shared/ui/error-view";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={errorPageStyles["error-page"]}>
          <ErrorView reset={() => this.setState({ hasError: false })} />
        </main>
      );
    }
    return this.props.children;
  }
}
