/**
 * KULLANIM LİMİTİ KONTROL ÖRNEĞİ
 * =================================
 * 
 * Bu dosya, kullanım limitlerinin nasıl kontrol edileceğini gösterir.
 * Herhangi bir sayfada (Dashboard oluşturma, kullanıcı ekleme, işletme ekleme)
 * bu pattern'i kullanabilirsiniz.
 */

import React, { useState } from 'react';
import { useUsageLimits } from '../hooks/useUsageLimits';
import LimitWarningModal from '../components/LimitWarningModal';
import { LimitCheckResult } from '../types/subscription';

/**
 * ÖRNEK 1: DASHBOARD OLUŞTURMA
 */
export const CreateDashboardWithLimitCheck = () => {
  const { checkLimit, incrementUsage } = useUsageLimits();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitResult, setLimitResult] = useState<LimitCheckResult | null>(null);

  const handleCreateDashboard = async () => {
    // ✅ 1. Limit kontrolü yap
    const result = await checkLimit('dashboards', 'increment');

    if (!result.allowed) {
      // ❌ Limit aşıldı - Modal göster
      setLimitResult(result);
      setShowLimitModal(true);
      return;
    }

    // ⚠️ 2. Uyarı varsa göster (limit yaklaşıyor)
    if (result.warningMessage) {
      alert(result.warningMessage);
    }

    // ✅ 3. Kullanımı artır
    await incrementUsage('dashboards');

    // ✅ 4. Dashboard oluştur
    console.log('✅ Dashboard oluşturuluyor...');
    // createDashboard() fonksiyonunu çağır
  };

  return (
    <>
      <button onClick={handleCreateDashboard} className="px-4 py-2 bg-blue-600 text-white rounded">
        Yeni Dashboard Oluştur
      </button>

      {/* Limit Modal */}
      {limitResult && (
        <LimitWarningModal
          isOpen={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          limitType="dashboards"
          limitResult={limitResult}
          actionName="Yeni dashboard oluşturma"
        />
      )}
    </>
  );
};

/**
 * ÖRNEK 2: KULLANICI EKLEME
 */
export const AddUserWithLimitCheck = () => {
  const { checkLimit, incrementUsage } = useUsageLimits();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitResult, setLimitResult] = useState<LimitCheckResult | null>(null);

  const handleAddUser = async () => {
    // ✅ 1. Limit kontrolü
    const result = await checkLimit('users', 'increment');

    if (!result.allowed) {
      // ❌ Limit aşıldı
      setLimitResult(result);
      setShowLimitModal(true);
      return;
    }

    // ✅ 2. Kullanımı artır
    await incrementUsage('users');

    // ✅ 3. Kullanıcı ekle
    console.log('✅ Kullanıcı ekleniyor...');
  };

  return (
    <>
      <button onClick={handleAddUser} className="px-4 py-2 bg-green-600 text-white rounded">
        Yeni Kullanıcı Ekle
      </button>

      {limitResult && (
        <LimitWarningModal
          isOpen={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          limitType="users"
          limitResult={limitResult}
          actionName="Yeni kullanıcı ekleme"
        />
      )}
    </>
  );
};

/**
 * ÖRNEK 3: İŞLETME EKLEME
 */
export const AddBusinessWithLimitCheck = () => {
  const { checkLimit, incrementUsage } = useUsageLimits();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitResult, setLimitResult] = useState<LimitCheckResult | null>(null);

  const handleAddBusiness = async () => {
    // ✅ 1. Limit kontrolü
    const result = await checkLimit('businesses', 'increment');

    if (!result.allowed) {
      // ❌ Limit aşıldı
      setLimitResult(result);
      setShowLimitModal(true);
      return;
    }

    // ✅ 2. Kullanımı artır
    await incrementUsage('businesses');

    // ✅ 3. İşletme ekle
    console.log('✅ İşletme ekleniyor...');
  };

  return (
    <>
      <button onClick={handleAddBusiness} className="px-4 py-2 bg-purple-600 text-white rounded">
        Yeni İşletme Ekle
      </button>

      {limitResult && (
        <LimitWarningModal
          isOpen={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          limitType="businesses"
          limitResult={limitResult}
          actionName="Yeni işletme ekleme"
        />
      )}
    </>
  );
};

/**
 * ÖRNEK 4: SÜRE KONTROLÜ (Login sırasında)
 */
export const CheckSubscriptionDuration = () => {
  const { checkLimit } = useUsageLimits();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitResult, setLimitResult] = useState<LimitCheckResult | null>(null);

  const handleCheckDuration = async () => {
    // ✅ Abonelik süresi kontrolü
    const result = await checkLimit('duration');

    if (!result.allowed) {
      // ❌ Abonelik dolmuş
      setLimitResult(result);
      setShowLimitModal(true);
      return;
    }

    // ⚠️ Uyarı varsa göster
    if (result.warningMessage) {
      alert(result.warningMessage);
    }
  };

  return (
    <>
      <button onClick={handleCheckDuration} className="px-4 py-2 bg-orange-600 text-white rounded">
        Abonelik Durumunu Kontrol Et
      </button>

      {limitResult && (
        <LimitWarningModal
          isOpen={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          limitType="duration"
          limitResult={limitResult}
          actionName="Platform erişimi"
        />
      )}
    </>
  );
};

/**
 * ÖRNEK 5: SAKIN KONTROL (Sadece göster, artırma)
 */
export const ViewCurrentUsage = () => {
  const { checkLimit } = useUsageLimits();

  const handleCheckUsage = async () => {
    const dashboards = await checkLimit('dashboards', 'check');
    const users = await checkLimit('users', 'check');
    const businesses = await checkLimit('businesses', 'check');

    console.log('Mevcut Kullanım:');
    console.log(`Dashboards: ${dashboards.currentUsage} / ${dashboards.limit}`);
    console.log(`Users: ${users.currentUsage} / ${users.limit}`);
    console.log(`Businesses: ${businesses.currentUsage} / ${businesses.limit}`);
  };

  return (
    <button onClick={handleCheckUsage} className="px-4 py-2 bg-gray-600 text-white rounded">
      Kullanımı Görüntüle
    </button>
  );
};

/**
 * KULLANIM SENARYOLARI:
 * 
 * 1. Dashboard Oluşturma:
 *    - Kullanıcı "Yeni Dashboard" butonuna tıklar
 *    - checkLimit('dashboards', 'increment') çağrılır
 *    - Limit varsa → incrementUsage('dashboards') çağrılır
 *    - Limit yoksa → Modal gösterilir, upgrade önerilir
 * 
 * 2. Kullanıcı Ekleme:
 *    - Kullanıcı "Yeni Kullanıcı Ekle" butonuna tıklar
 *    - checkLimit('users', 'increment') çağrılır
 *    - Limit varsa → incrementUsage('users') çağrılır
 *    - Limit yoksa → Modal gösterilir
 * 
 * 3. İşletme Ekleme:
 *    - Kullanıcı "Yeni İşletme Ekle" butonuna tıklar
 *    - checkLimit('businesses', 'increment') çağrılır
 *    - Limit varsa → incrementUsage('businesses') çağrılır
 *    - Limit yoksa → Modal gösterilir
 * 
 * 4. Abonelik Süresi:
 *    - Login sırasında checkLimit('duration') çağrılır
 *    - 0 gün kaldıysa → Erişim engellenir, yenileme önerilir
 *    - 7 gün kaldıysa → Uyarı gösterilir
 * 
 * 5. Silme İşlemleri:
 *    - Dashboard silindikten sonra → decrementUsage('dashboards')
 *    - Kullanıcı silindikten sonra → decrementUsage('users')
 *    - İşletme silindikten sonra → decrementUsage('businesses')
 */



















