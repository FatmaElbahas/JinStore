import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import OrderStatus from './OrderStatus';
import { OrdersTableProps } from '../../types';
import { useTranslation } from 'react-i18next';

export default function OrdersTable({ orders, selectedOrders, onSelectOrder, onSelectAll }: OrdersTableProps) {
  const allSelected = orders.length > 0 && selectedOrders.length === orders.length;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-primary-50 rounded-lg overflow-x-auto p-1 sm:p-2">
        <table className="w-full min-w-[640px]" style={{ borderSpacing: '0 8px', borderCollapse: 'separate', direction: isRTL ? 'rtl' : 'ltr' }}>
          <thead className="bg-primary-50">
            <tr className="rounded-lg">
              <th className="opacity-100" style={{ width: '8%', height: '34px', paddingTop: '9.8px', paddingRight: '8px', paddingBottom: '9.81px', paddingLeft: '8px' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="text-primary-100 opacity-100 border focus:ring-primary-100"
                  style={{ width: '14.39px', height: '14.39px', borderRadius: '3px', borderWidth: '1px' }}
                  aria-label={t('orders.table.selectAll')}
                />
              </th>
              <th className="px-2 opacity-100 text-gray-900 uppercase align-middle" style={{ width: '12%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '1px', textAlign: isRTL ? 'right' : 'left' }}>
                {t('orders.table.id')}
              </th>
              <th className="px-2 opacity-100 text-gray-900 uppercase align-middle" style={{ width: '30%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '1px', textAlign: isRTL ? 'right' : 'left' }}>
                {t('orders.table.name')}
              </th>
              <th className="px-2 opacity-100 text-gray-900 uppercase align-middle" style={{ width: '22%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '1px', textAlign: isRTL ? 'right' : 'left' }}>
                {t('orders.table.date')}
              </th>
              <th className="px-2 opacity-100 text-gray-900 uppercase align-middle" style={{ width: '15%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '1px', textAlign: isRTL ? 'right' : 'left' }}>
                {t('orders.table.total')}
              </th>
              <th className="px-2 opacity-100 text-gray-900 uppercase align-middle" style={{ width: '18%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '1px', textAlign: isRTL ? 'right' : 'left' }}>
                {t('orders.table.status')}
              </th>
              <th className="opacity-100 text-gray-900 uppercase align-middle" style={{ width: '16%', height: '34px', paddingTop: '7.5px', paddingRight: '8px', paddingBottom: '8.5px', paddingLeft: '128.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '1px', textAlign: isRTL ? 'right' : 'left' }}>
                {t('orders.table.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => onSelectOrder(order.id)}
                className="bg-white hover:bg-gray-50 transition-colors opacity-100 rounded-lg cursor-pointer" 
                style={{ height: '88.19px' }}
              >
                <td 
                  className="opacity-100" 
                  style={{ width: '8%', height: '34px', paddingTop: '9.8px', paddingRight: '8px', paddingBottom: '9.81px', paddingLeft: '8px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => onSelectOrder(order.id)}
                    className="text-primary-100 opacity-100 border focus:ring-primary-100 cursor-pointer"
                    style={{ width: '14.39px', height: '14.39px', borderRadius: '3px', borderWidth: '1px' }}
                    aria-label={`Select order ${order.id}`}
                  />
                </td>
                <td className="px-2 opacity-100 text-gray-900 align-middle" style={{ width: '12%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}>
                  {order.id}
                </td>
                <td className="px-2 opacity-100 text-gray-900 align-middle" style={{ width: '30%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}>
                  {order.name}
                </td>
                <td className="px-2 opacity-100 text-gray-500 align-middle" style={{ width: '22%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}>
                  {order.date}
                </td>
                <td className="px-2 opacity-100 text-gray-900 align-middle" style={{ width: '15%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}>
                  ${order.total}
                </td>
                <td className="px-2 opacity-100 align-middle" style={{ width: '18%', height: '34px', paddingTop: '7.5px', paddingBottom: '8.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}>
                  <OrderStatus status={order.status} />
                </td>
                <td 
                  className="opacity-100 text-gray-500 align-middle" 
                  style={{ width: '16%', height: '34px', paddingTop: '7.5px', paddingRight: '8px', paddingBottom: '8.5px', paddingLeft: '128.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={`Actions for order ${order.id}`}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {/* Select All */}
        <div className="bg-white rounded-lg p-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="text-primary-100 border focus:ring-primary-100"
            style={{ width: '16px', height: '16px', borderRadius: '3px' }}
            aria-label={t('orders.table.selectAll')}
          />
          <span className="text-sm font-medium text-gray-700">{t('orders.table.selectAll')}</span>
        </div>

        {/* Order Cards */}
        {orders.map((order) => (
          <div 
            key={order.id} 
            onClick={() => onSelectOrder(order.id)}
            className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onSelectOrder(order.id)}
                  className="text-primary-100 border focus:ring-primary-100 cursor-pointer"
                  style={{ width: '16px', height: '16px', borderRadius: '3px' }}
                  aria-label={`Select order ${order.id}`}
                />
              </div>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-500"
                aria-label={`Actions for order ${order.id}`}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* ID */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('orders.table.id')}:
                </span>
                <span className="text-gray-900 font-medium" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                  {order.id}
                </span>
              </div>

              {/* Name */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('orders.table.name')}:
                </span>
                <span className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                  {order.name}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('orders.table.date')}:
                </span>
                <span className="text-gray-500" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
                  {order.date}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('orders.table.total')}:
                </span>
                <span className="text-gray-900 font-medium" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                  ${order.total}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t('orders.table.status')}:
                </span>
                <OrderStatus status={order.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
