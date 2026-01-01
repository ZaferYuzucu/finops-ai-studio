import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Hata olduğunda state'i güncelle
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Hata detaylarını logluyoruz
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Production'da hata tracking servisine gönderebilirsiniz
    // Örnek: Sentry.captureException(error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="relative mb-8 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl absolute"></div>
              <AlertTriangle className="w-24 h-24 text-red-600 relative z-10" />
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bir Hata Oluştu
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Üzgünüz, beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenilemeyi deneyin.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                Sayfayı Yenile
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 font-medium"
              >
                <Home className="w-5 h-5" />
                Ana Sayfaya Dön
              </Link>
            </div>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm border border-red-200 rounded-2xl text-left">
                <h3 className="text-lg font-semibold text-red-700 mb-3">
                  🐛 Geliştirici Bilgisi:
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Hata Mesajı:</span>
                    <p className="text-sm text-red-600 font-mono mt-1 break-words">
                      {this.state.error.toString()}
                    </p>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Stack Trace:</span>
                      <pre className="text-xs text-gray-600 font-mono mt-1 overflow-auto max-h-48 bg-gray-50 p-3 rounded-lg">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Support */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Sorun devam ederse bizimle iletişime geçin:
              </p>
              <a
                href="mailto:support@finops-ai-studio.com"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                support@finops-ai-studio.com
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;














