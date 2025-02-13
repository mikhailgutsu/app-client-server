class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>A apărut o eroare! Vă rugăm să reîncărcați pagina.</h2>;
    }
    return this.props.children;
  }
}
