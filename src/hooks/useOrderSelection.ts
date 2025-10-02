import { useState, useCallback } from 'react';
import { Order } from '../types';

export function useOrderSelection() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Optimized with useCallback to prevent unnecessary re-renders
  const handleSelectOrder = useCallback((orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  // Optimized to use functional update for better performance
  const handleSelectAll = useCallback((orders: Order[]) => {
    setSelectedOrders(prev => {
      const orderIds = orders.map(order => order.id);
      // Toggle selection: if all are selected, deselect all; otherwise select all
      const allSelected = orderIds.every(id => prev.includes(id)) && orderIds.length === prev.length;
      return allSelected ? [] : orderIds;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedOrders([]), []);

  return {
    selectedOrders,
    handleSelectOrder,
    handleSelectAll,
    clearSelection,
  };
}

