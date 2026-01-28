/**
 * 🛡️ GLOBAL ERROR BOUNDARY - Anti-Chaos Katmanı 6
 * 
 * Beyaz sayfa (white screen) = KESİNLİKLE YASAK
 * Her hata durumunda graceful degradation
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { translateError, createErrorDisplay, UserFriendlyError } from './userDignityGuard';
import { logRuntimeError } from '../diagnostics/eventLogger';

interface Props {
  children: ReactNode;
  fallbackUI?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  friendlyError: UserFriendlyError | null;
}

/**
 * Global Error Boundary - Beyaz sayfa önleme
 */
export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      friendlyError: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Hata yakalandı, friendly error oluştur
    const friendlyError = translateError(error);
    
    return {
      hasError: true,
      error,
      friendlyError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Hata logla (kullanıcı görmez)
    console.group('🔴 [Global Error Boundary] Hata Yakalandı');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.groupEnd();
    
    // 🛡️ Diagnostics: Runtime error log (sessiz)
    logRuntimeError(
      undefined, // userId (opsiyonel, error boundary'de yok)
      undefined, // email
      error,
      {
        componentStack: errorInfo.componentStack,
        errorBoundary: 'GlobalErrorBoundary',
      }
    ).catch(() => {}); // Sessizce atla, UI etkilenmez
    
    // Error tracking servisine gönder (ör: Sentry)
    // trackError(error, errorInfo);
    
    this.setState({
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      friendlyError: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const { friendlyError } = this.state;
      
      // Custom fallback UI varsa onu kullan
      if (this.props.fallbackUI) {
        return this.props.fallbackUI;
      }
      
      // Default fallback UI
      if (friendlyError) {
        const errorDisplay = createErrorDisplay(friendlyError);
        
        return (
          <div className={errorDisplay.className}>
            <div className="flex items-start gap-4">
              <div className="text-2xl">{errorDisplay.colors.icon}</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{friendlyError.title}</h2>
                <p className="mb-4">{friendlyError.message}</p>
                <div className="bg-white/50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium mb-1">💡 Öneri:</p>
                  <p className="text-sm">{friendlyError.suggestion}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={this.handleReset}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Tekrar Dene
                  </button>
                  {friendlyError.actionUrl && (
                    <a
                      href={friendlyError.actionUrl}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      {friendlyError.actionLabel || 'Devam Et'}
                    </a>
                  )}
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Ana Sayfa
                  </button>
                </div>
                {import.meta.env.DEV && friendlyError.technicalDetails && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-600">🔧 Teknik Detaylar (Dev Mode)</summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {friendlyError.technicalDetails}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      // Fallback fallback (eğer friendly error oluşturulamazsa)
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4 text-center">⚠️</div>
            <h1 className="text-2xl font-bold text-center mb-4">Bir Sorun Oluştu</h1>
            <p className="text-gray-600 text-center mb-6">
              Beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenilemeyi deneyin.
            </p>
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tekrar Dene
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Ana Sayfa
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC: Component'i error boundary ile sar
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallbackUI?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <GlobalErrorBoundary fallbackUI={fallbackUI}>
        <Component {...props} />
      </GlobalErrorBoundary>
    );
  };
}
