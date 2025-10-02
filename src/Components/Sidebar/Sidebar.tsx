import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

// Sidebar icon paths
const ICONS = {
  dashboard: new URL('../../assets/Images/DasboardIcon.svg', import.meta.url).href,
  orders: new URL('../../assets/Images/OrdersIcon.svg', import.meta.url).href,
  invoices: new URL('../../assets/Images/InvoicesIcon.svg', import.meta.url).href,
  products: new URL('../../assets/Images/ProductsIcon.png', import.meta.url).href,
  customers: new URL('../../assets/Images/CustomersIcon.svg', import.meta.url).href,
  chats: new URL('../../assets/Images/ChatsIcon.svg', import.meta.url).href,
  email: new URL('../../assets/Images/EmailIcon.svg', import.meta.url).href,
  todo: new URL('../../assets/Images/TodoIcon.svg', import.meta.url).href,
  profile: new URL('../../assets/Images/ProfileIcon.svg', import.meta.url).href,
  user: new URL('../../assets/Images/UserIcon.svg', import.meta.url).href,
  authentication: new URL('../../assets/Images/AuthenticationIcon.svg', import.meta.url).href,
  errorPage: new URL('../../assets/Images/ErrorPageIcon.svg', import.meta.url).href,
};

// Logo
const LOGO = new URL('../../assets/Images/LOGO.svg', import.meta.url).href;

interface MenuItem {
  id: string;
  label: string;
  icon: string; // Changed to string for image path
  badge?: number;
  path?: string;
  submenu?: { id: string; label: string; path: string }[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function Sidebar() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { t } = useTranslation();

  const menuSections: MenuSection[] = [
    {
      title: t('sidebar.ecommerce'),
      items: [
        { id: 'dashboard', label: t('sidebar.dashboard'), icon: ICONS.dashboard, path: '/' },
        { id: 'orders', label: t('sidebar.orders'), icon: ICONS.orders, badge: 2, path: '/orders' },
        { id: 'detail', label: t('sidebar.detail'), icon: ICONS.invoices, path: '/detail' },
        { 
          id: 'products', 
          label: t('sidebar.products'), 
          icon: ICONS.products,
          submenu: [
            { id: 'list-view', label: t('sidebar.listView'), path: '/products/list' },
            { id: 'grid-view', label: t('sidebar.gridView'), path: '/products/grid' },
            { id: 'product-detail', label: t('sidebar.productDetail'), path: '/products/detail' },
            { id: 'shopping-cart', label: t('sidebar.shoppingCart'), path: '/products/cart' },
            { id: 'checkout', label: t('sidebar.checkout'), path: '/products/checkout' },
          ]
        },
        { id: 'buyer', label: t('sidebar.buyer'), icon: ICONS.user, path: '/buyer' },
        { id: 'customers', label: t('sidebar.customers'), icon: ICONS.customers, path: '/customers' },
        { id: 'invoices', label: t('sidebar.invoices'), icon: ICONS.invoices, path: '/invoices' },
      ]
    },
    {
      title: t('sidebar.apps'),
      items: [
        { id: 'chats', label: t('sidebar.chats'), icon: ICONS.chats, badge: 6 },
        { id: 'email', label: t('sidebar.email'), icon: ICONS.email },
        { id: 'todo', label: t('sidebar.todo'), icon: ICONS.todo },
      ]
    },
    {
      title: t('sidebar.pages'),
      items: [
        { id: 'profile', label: t('sidebar.profile'), icon: ICONS.profile },
        { id: 'users', label: t('sidebar.users'), icon: ICONS.user },
        { id: 'authentication', label: t('sidebar.authentication'), icon: ICONS.authentication },
        { id: 'error', label: t('sidebar.error'), icon: ICONS.errorPage },
      ]
    }
  ];

  // Helper function to check if a path is active
  const isPathActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  // Helper function to check if submenu should be active
  const isSubmenuActive = (submenu?: { id: string; label: string; path: string }[]) => {
    if (!submenu) return false;
    return submenu.some(item => location.pathname === item.path);
  };

  // Auto-expand menu if submenu item is active
  useEffect(() => {
    menuSections.forEach(section => {
      section.items.forEach(item => {
        if (item.submenu && isSubmenuActive(item.submenu)) {
          setExpandedMenu(item.id);
        }
      });
    });
  }, [location.pathname]);

  return (
    <aside className="h-screen bg-primary-50 overflow-y-auto flex-shrink-0 scrollbar-hide hidden lg:block lg:w-[21%]" role="navigation" aria-label="Main navigation">
      <div>
        <div 
          className="flex items-center"
          style={{
            width: '100%',
            height: '98px',
            opacity: 1,
            // paddingRight: '24px',
            paddingBottom: '8px',
            // paddingLeft: '24px'
          }}
        >
          <img 
            src={LOGO} 
            alt="JinStore Logo" 
            className="object-contain"
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        
        <div 
          className="flex items-center gap-3 relative"
          style={{
            width: 'calc(100% - 32px)',
            height: '70px',
            opacity: 1,
            top: '-6px',
            paddingTop: '8px',
            paddingBottom: '8px',
            backgroundColor: '#FFFFFF',
            marginLeft: '24px',
            marginRight: '0px'
          }}
        >
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
            B
          </div>
          <div>
            <p className="text-gray-900" style={{ fontSize: '15px', lineHeight: '22.5px', fontWeight: 500 }}>
              Showan Forohl
            </p>
            <p className="text-xs text-gray-500" style={{ lineHeight: '18px', fontWeight: 400 }}>
              {t('sidebar.salesManager')}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4" aria-label="Main navigation">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item) => (
                <li key={item.id}>
                {item.submenu ? (
                  <button
                    onClick={() => setExpandedMenu(expandedMenu === item.id ? null : item.id)}
                    className={`flex items-center gap-3 transition-colors text-gray-700
                      ${isSubmenuActive(item.submenu) ? 'bg-white' : 'hover:bg-gray-100'}
                    `}
                      style={{ 
                        width: 'calc(100% - 24px)',
                        height: '43px',
                        borderRadius: '80px',
                        paddingTop: '10px',
                        paddingRight: '0px',
                        paddingBottom: '10px',
                        paddingLeft: '24px',
                        borderRightWidth: '4px',
                        borderLeftWidth: '4px',
                        borderColor: 'transparent',
                        fontSize: '15px', 
                        lineHeight: '22.5px', 
                        fontWeight: 400,
                        opacity: 1
                      }}
                    >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className="w-5 h-5 object-contain transition-all"
                    />
                    <span className="flex-1 text-start">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium align-middle" style={{ backgroundColor: '#05B171', color: 'white' }}>
                        {item.badge}
                      </span>
                    )}
                      <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className={`w-3 text-gray-400 transition-transform align-middle ${
                          expandedMenu === item.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                ) : (
                  <Link
                    to={item.path || '#'}
                    className={`flex items-center gap-3 transition-colors
                      ${isPathActive(item.path) 
                        ? 'bg-primary-100 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{ 
                        width: 'calc(100% - 24px)',
                        height: '43px',
                        borderRadius: '80px',
                        paddingTop: '10px',
                        paddingRight: '0px',
                        paddingBottom: '10px',
                        paddingLeft: '24px',
                        borderRightWidth: '4px',
                        borderLeftWidth: '4px',
                        borderColor: 'transparent',
                        fontSize: '15px', 
                        lineHeight: '22.5px', 
                        fontWeight: 400,
                        opacity: 1
                      }}
                    >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className="w-5 h-5 object-contain transition-all"
                      style={{
                        filter: isPathActive(item.path) ? 'brightness(0) invert(1)' : 'none'
                      }}
                    />
                    <span className="flex-1 text-start">{item.label}</span>
                    {item.badge && (
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium align-middle"
                        style={{
                          backgroundColor: isPathActive(item.path) ? 'white' : '#05B171',
                          color: isPathActive(item.path) ? '#05B171' : 'white'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    </Link>
                  )}
                  
                  {item.submenu && expandedMenu === item.id && (
                    <ul className="mt-2 space-y-2 ps-8">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.path}
                            className={`flex items-center transition-colors
                              ${isPathActive(subItem.path)
                                ? 'text-white bg-primary-100 font-medium'
                                : 'text-gray-600 hover:text-primary-100 hover:bg-gray-50'
                              }`}
                            style={{ 
                              width: '270px',
                              height: '43px',
                              borderRadius: '80px',
                              paddingTop: '10px',
                              paddingRight: '0px',
                              paddingBottom: '10px',
                              paddingLeft: '24px',
                              borderRightWidth: '4px',
                              borderLeftWidth: '4px',
                              borderColor: 'transparent',
                              fontSize: '15px', 
                              lineHeight: '22.5px', 
                              fontWeight: 400,
                              opacity: 1
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
