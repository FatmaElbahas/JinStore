import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Order } from '../../types';

interface EditOrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderId: string, updatedOrder: Partial<Order>) => void;
}

export default function EditOrderModal({ order, isOpen, onClose, onSave }: EditOrderModalProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    total: '',
    status: 'pending'
  });

  useEffect(() => {
    if (order) {
      setFormData({
        name: order.name,
        date: order.date,
        total: order.total.toString(),
        status: order.status
      });
    }
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      const updatedOrder: Partial<Order> = {
        name: formData.name,
        date: formData.date,
        total: parseFloat(formData.total),
        status: formData.status as 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped' | 'refunded'
      };
      onSave(order.id, updatedOrder);
      onClose();
    }
  };

  const statusOptions = [
    { value: 'pending', label: t('orders.status.pending') || 'Pending' },
    { value: 'processing', label: t('orders.status.processing') || 'Processing' },
    { value: 'shipped', label: t('orders.status.shipped') || 'Shipped' },
    { value: 'completed', label: t('orders.status.completed') || 'Completed' },
    { value: 'cancelled', label: t('orders.status.cancelled') || 'Cancelled' },
    { value: 'refunded', label: t('orders.status.refunded') || 'Refunded' }
  ];

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {t('orders.editOrder') || 'Edit Order'} #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t('common.close') || 'Close'}
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('orders.customerName') || 'Customer Name'} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              {t('orders.orderDate') || 'Order Date'} *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
            />
          </div>

          <div>
            <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
              {t('orders.total') || 'Total'} *
            </label>
            <input
              type="number"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              {t('orders.status') || 'Status'} *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('common.cancel') || 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} />
              <span>{t('common.save') || 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
