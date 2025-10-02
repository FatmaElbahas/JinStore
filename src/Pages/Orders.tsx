import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Components/Navbar/Navbar';
import OrdersHeader from '../Components/Orders/OrdersHeader';
import OrdersFilters from '../Components/Orders/OrdersFilters';
import OrdersTable from '../Components/Orders/OrdersTable';
import Pagination from '../Components/Orders/Pagination';
import Footer from '../Components/Footer/Footer';
import { useOrders } from '../hooks/useOrders';
import { useOrderSelection } from '../hooks/useOrderSelection';
import { INITIAL_ORDERS, ITEMS_PER_PAGE } from '../constants/orderData';
import { useTranslation } from 'react-i18next';

export default function Orders() {
  const { t } = useTranslation();
  
  const {
    filters,
    searchTerm,
    currentPage,
    totalPages,
    currentOrders,
    itemsPerPage,
    handleFilterChange,
    handleSearchChange,
    handlePageChange,
    handleItemsPerPageChange,
  } = useOrders(INITIAL_ORDERS, ITEMS_PER_PAGE);

  const {
    selectedOrders,
    handleSelectOrder,
    handleSelectAll,
  } = useOrderSelection();

  // Optimized callback to handle search input
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  }, [handleSearchChange]);

  // Optimized callback to handle select all with current orders
  const handleSelectAllOrders = useCallback(() => {
    handleSelectAll(currentOrders);
  }, [handleSelectAll, currentOrders]);

  return (
    <>
      <Helmet>
        <title>{t('nav.orders')} - JinStore</title>
        <meta name="description" content="Manage and track all your orders in one place. View order status, filter, and search orders easily." />
      </Helmet>
      <main className="flex-1 overflow-y-auto flex flex-col bg-primary-50">
        <Navbar onSearch={handleSearch} />
      
      <div className="flex-1 px-3 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 bg-primary-50">
        <h1 className="sr-only">{t('nav.orders')}</h1>
        <OrdersHeader />
        
        <section aria-label="Orders management">
          <OrdersFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          <OrdersTable
            orders={currentOrders}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAllOrders}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </div>
      
      <Footer />
    </main>
    </>
  );
}
