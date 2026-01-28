/**
 * 👤 USER DIGNITY GUARD - Anti-Chaos Katmanı 3
 * 
 * Kullanıcı ASLA suçlanmaz.
 * Hata mesajları kullanıcı dostu ve yardımcı olmalı.
 * Teknik hata metni kullanıcıya gösterilmez.
 */

export interface UserFriendlyError {
  title: string;
  message: string;
  suggestion: string;
  actionLabel?: string;
  actionUrl?: string;
  severity: 'info' | 'warning' | 'error';
  technicalDetails?: string; // Sadece dev mode'da gösterilir
}

/**
 * Teknik hatayı kullanıcı dostu mesaja çevir
 */
export function translateError(error: Error | string, context?: Record<string, any>): UserFriendlyError {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorLower = errorMessage.toLowerCase();
  
  // CSV/Excel parse hataları
  if (errorLower.includes('csv') || errorLower.includes('parse') || errorLower.includes('delimiter')) {
    return {
      title: 'Dosya Formatı',
      message: 'Dosyanızı okurken bir sorun yaşadık. Dosya formatı beklenenden farklı olabilir.',
      suggestion: 'Lütfen dosyanızın CSV veya Excel formatında olduğundan ve doğru şekilde kaydedildiğinden emin olun. Farklı bir dosya deneyebilirsiniz.',
      severity: 'warning',
      technicalDetails: errorMessage,
    };
  }
  
  // Encoding hataları
  if (errorLower.includes('encoding') || errorLower.includes('utf') || errorLower.includes('bom')) {
    return {
      title: 'Karakter Kodlaması',
      message: 'Dosyanızdaki bazı karakterler doğru görünmüyor olabilir.',
      suggestion: 'Dosyanızı UTF-8 formatında kaydetmeyi deneyin. Excel\'de "Farklı Kaydet" > "CSV UTF-8" seçeneğini kullanabilirsiniz.',
      severity: 'warning',
      technicalDetails: errorMessage,
    };
  }
  
  // Numeric hataları
  if (errorLower.includes('numeric') || errorLower.includes('number') || errorLower.includes('sayı')) {
    return {
      title: 'Sayısal Veri',
      message: 'Bazı sayısal sütunlar belirsiz görünüyor. Bu normal bir durum.',
      suggestion: 'Hangi sütunların sayısal olduğunu seçmeniz istenecek. Verilerinize bakarak en uygun seçimi yapabilirsiniz.',
      severity: 'info',
      technicalDetails: errorMessage,
    };
  }
  
  // Dosya boyutu hataları
  if (errorLower.includes('size') || errorLower.includes('boyut') || errorLower.includes('large')) {
    return {
      title: 'Dosya Boyutu',
      message: 'Dosyanız biraz büyük görünüyor.',
      suggestion: 'Daha küçük bir dosya deneyebilir veya verilerinizi birden fazla dosyaya bölebilirsiniz.',
      severity: 'warning',
      technicalDetails: errorMessage,
    };
  }
  
  // Network hataları
  if (errorLower.includes('network') || errorLower.includes('fetch') || errorLower.includes('connection')) {
    return {
      title: 'Bağlantı Sorunu',
      message: 'Sunucuya bağlanırken bir sorun yaşadık.',
      suggestion: 'İnternet bağlantınızı kontrol edin ve birkaç saniye sonra tekrar deneyin.',
      severity: 'error',
      technicalDetails: errorMessage,
    };
  }
  
  // Auth hataları
  if (errorLower.includes('auth') || errorLower.includes('permission') || errorLower.includes('unauthorized')) {
    return {
      title: 'Yetki Sorunu',
      message: 'Bu işlem için giriş yapmanız gerekiyor.',
      suggestion: 'Lütfen giriş yapın veya hesabınızı kontrol edin.',
      actionLabel: 'Giriş Yap',
      actionUrl: '/login',
      severity: 'error',
      technicalDetails: errorMessage,
    };
  }
  
  // Firestore hataları
  if (errorLower.includes('firestore') || errorLower.includes('firebase') || errorLower.includes('database')) {
    return {
      title: 'Veri Kaydetme',
      message: 'Verilerinizi kaydederken bir sorun yaşadık.',
      suggestion: 'Lütfen birkaç saniye sonra tekrar deneyin. Sorun devam ederse bizimle iletişime geçin.',
      severity: 'error',
      technicalDetails: errorMessage,
    };
  }
  
  // Genel hata
  return {
    title: 'Bir Sorun Oluştu',
    message: 'Beklenmeyen bir durumla karşılaştık. Endişelenmeyin, verileriniz güvende.',
    suggestion: 'Sayfayı yenilemeyi deneyin veya farklı bir işlem yapmayı deneyin.',
    severity: 'error',
    technicalDetails: errorMessage,
  };
}

/**
 * Kullanıcıya gösterilecek hata mesajı formatı
 */
export function formatUserMessage(error: UserFriendlyError, showTechnicalDetails = false): string {
  let message = `${error.title}\n\n${error.message}\n\n💡 ${error.suggestion}`;
  
  if (error.actionLabel && error.actionUrl) {
    message += `\n\n[${error.actionLabel}](${error.actionUrl})`;
  }
  
  if (showTechnicalDetails && error.technicalDetails) {
    message += `\n\n🔧 Teknik Detay: ${error.technicalDetails}`;
  }
  
  return message;
}

/**
 * React component için hata mesajı objesi
 */
export function createErrorDisplay(error: UserFriendlyError) {
  const severityColors = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ️' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '⚠️' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '❌' },
  };
  
  const colors = severityColors[error.severity];
  
  return {
    ...error,
    colors,
    className: `${colors.bg} ${colors.border} ${colors.text} border-2 rounded-lg p-4`,
  };
}

/**
 * Console'a logla (kullanıcı görmez)
 */
export function logErrorSafely(error: Error | string, context?: Record<string, any>) {
  const friendly = translateError(error, context);
  
  console.group(`🔴 [User Dignity Guard] ${friendly.title}`);
  console.error('Technical Error:', typeof error === 'string' ? error : error.message);
  console.error('Friendly Message:', friendly.message);
  if (context) {
    console.error('Context:', context);
  }
  if (friendly.technicalDetails) {
    console.error('Technical Details:', friendly.technicalDetails);
  }
  console.groupEnd();
}
