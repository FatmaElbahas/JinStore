import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './Components/Sidebar/Sidebar';
import Orders from './Pages/Orders';
import ProductsGridView from './Pages/Products/ProductsGridView';
import ProductsListView from './Pages/Products/ProductsListView';
import ProductDetail from './Pages/Products/ProductDetail';
import ShoppingCart from './Pages/Products/ShoppingCart';
import Checkout from './Pages/Products/Checkout';
import NotFound from './Pages/NotFound';
import LoadingDemo from './Pages/LoadingDemo';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang and dir attributes when language changes
    const html = document.documentElement;
    html.lang = i18n.language;
    html.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Router>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-100 focus:text-white focus:rounded">
        Skip to main content
      </a>
      <div className="flex h-screen overflow-hidden gap-5">
        {/* Sidebar - Hidden on mobile & tablet, visible only on large screens (laptops) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div id="main-content" role="main" className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products/grid" element={<ProductsGridView />} />
            <Route path="/products/list" element={<ProductsListView />} />
            <Route path="/products/detail" element={<ProductDetail />} />
            <Route path="/products/cart" element={<ShoppingCart />} />
            <Route path="/products/checkout" element={<Checkout />} />
            <Route path="/loading-demo" element={<LoadingDemo />} />
            {/* Catch all route - 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
