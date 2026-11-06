import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { failed: false, reloading: false };
  disposed = false;

  componentDidMount() {
    this.disposed = false;
  }

  componentWillUnmount() {
    this.disposed = true;
    this.reloadController?.abort();
  }

  reload = async () => {
    if (this.state.reloading) return;
    this.setState({ reloading: true });
    this.reloadController = new AbortController();
    const timeout = setTimeout(() => this.reloadController.abort(), 5000);
    try {
      // Refresh Vite's section assets first: Safari can retain failed imports
      // across reloads until a successful request replaces the cached failure.
      const assets = [...document.querySelectorAll('link[rel="modulepreload"], link[rel="preload"][as="script"]')]
        .map((link) => link.href)
        .filter((href) => new URL(href).origin === window.location.origin);
      await Promise.allSettled([...new Set(assets)].map((url) => fetch(url, {
        cache: "reload", signal: this.reloadController.signal,
      })));
    } finally {
      clearTimeout(timeout);
      if (!this.disposed) window.location.reload();
    }
  };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <section role="alert" className="app-page justify-center min-h-[240px] bg-[#181818] text-zinc-100">
        <h1 className="text-xl font-bold">{this.props.section ? `${this.props.section.replace(/_/g, " ")} is unavailable` : "The portfolio could not load"}</h1>
        <p className="app-body">Please reload the page to try again. You can also contact me directly by email.</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="app-action" onClick={this.reload} disabled={this.state.reloading}>{this.state.reloading ? "Reloading…" : "Reload page"}</button>
          <a className="app-action-secondary" href="mailto:kaunghtetzaw.inbox@gmail.com">Email Kaung</a>
        </div>
      </section>
    );
  }
}
