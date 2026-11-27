import { useMemo, useReducer, useState, type FC } from 'react';
import { MotionConfig } from 'framer-motion';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/layout/Hero';
import { LocationSection } from '@/components/layout/LocationSection';
import { Navbar } from '@/components/layout/Navbar';
import { EditorialShowcase } from '@/components/layout/EditorialShowcase';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ConciergeModal } from '@/features/concierge/components/ConciergeModal';
import { LanguageProvider } from '@/features/i18n/LanguageContext';
import { LoyaltyBanner } from '@/features/loyalty/components/LoyaltyBanner';
import { MenuSection } from '@/features/menu/components/MenuSection';
import type { MenuItem } from '@/features/menu/types';
import { OrderDrawer } from '@/features/order/components/OrderDrawer';
import {
  INITIAL_ORDER_DRAFT,
  transitionOrderFlow,
} from '@/features/order/logic/orderMachine';
import { calculateCartTotals } from '@/features/order/logic/pricing';
import type { CartLine } from '@/features/order/types/orderTypes';

const KafExperience: FC = () => {
  const [cartLines, setCartLines] = useState<readonly CartLine[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);

  const [orderFlowState, dispatchOrderFlow] = useReducer(transitionOrderFlow, {
    status: 'editing',
    fulfillment: 'express_pickup',
    form: { ...INITIAL_ORDER_DRAFT },
    fieldErrors: {},
  });

  const quantitiesById = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const line of cartLines) {
      map[line.item.id] = line.quantity;
    }
    return map;
  }, [cartLines]);

  const totals = useMemo(
    () =>
      calculateCartTotals(
        cartLines,
        orderFlowState.status === 'editing'
          ? orderFlowState.fulfillment
          : 'express_pickup',
      ),
    [cartLines, orderFlowState],
  );

  const handleAddItem = (item: MenuItem): void => {
    setCartLines((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleDecrementItem = (itemId: string): void => {
    setCartLines((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const handleAddSommelierPairing = (items: readonly MenuItem[]): void => {
    for (const item of items) {
      handleAddItem(item);
    }
    if (orderFlowState.status === 'idle') {
      dispatchOrderFlow({ type: 'OPEN_DRAWER' });
    }
    setIsOrderDrawerOpen(true);
  };

  const handleOpenOrderDrawer = (): void => {
    if (orderFlowState.status === 'idle') {
      dispatchOrderFlow({ type: 'OPEN_DRAWER' });
    }
    setIsOrderDrawerOpen(true);
  };

  const handleStartHotelOrder = (): void => {
    dispatchOrderFlow({ type: 'SET_FULFILLMENT', fulfillment: 'hotel_room' });
    setIsOrderDrawerOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0E0C0B] text-[#F3EDE2]">
      <Navbar
        cartCount={totals.itemCount}
        onOpenOrder={handleOpenOrderDrawer}
        onOpenSommelier={() => setIsSommelierOpen(true)}
      />

      <main className="flex-1">
        <Hero onOpenSommelier={() => setIsSommelierOpen(true)} />

        <EditorialShowcase />

        <ErrorBoundary fallbackTitle="Menu unavailable right now">
          <MenuSection
            quantitiesById={quantitiesById}
            onAddItem={handleAddItem}
            onDecrementItem={handleDecrementItem}
          />
        </ErrorBoundary>

        <LoyaltyBanner stampsInCart={totals.boomingoStampsEarned} />

        <LocationSection onStartHotelOrder={handleStartHotelOrder} />
      </main>

      <Footer />

      <ErrorBoundary fallbackTitle="Order drawer interrupted">
        <OrderDrawer
          isOpen={isOrderDrawerOpen}
          lines={cartLines}
          flowState={orderFlowState}
          onClose={() => setIsOrderDrawerOpen(false)}
          onDispatchFlow={dispatchOrderFlow}
          onIncrementItem={handleAddItem}
          onDecrementItem={handleDecrementItem}
          onClearCart={() => setCartLines([])}
        />
      </ErrorBoundary>

      <ErrorBoundary fallbackTitle="AI Sommelier interrupted">
        <ConciergeModal
          isOpen={isSommelierOpen}
          onClose={() => setIsSommelierOpen(false)}
          onAddPairing={handleAddSommelierPairing}
        />
      </ErrorBoundary>
    </div>
  );
};

export const App: FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <KafExperience />
      </LanguageProvider>
    </MotionConfig>
  );
};

export default App;
