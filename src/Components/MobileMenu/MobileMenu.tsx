import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Sidebar from '../Sidebar/Sidebar';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={isRTL ? 'فتح القائمة' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={handleClose}
            aria-hidden="true"
          />
          
          <div 
            className="fixed inset-0 bg-primary-50 z-50 lg:hidden overflow-y-auto scrollbar-hide"
            dir={isRTL ? 'rtl' : 'ltr'}
            role="dialog"
            aria-modal="true"
            aria-label={isRTL ? 'القائمة الرئيسية' : 'Main menu'}
          >
            <div className="sticky top-0 w-full bg-primary-50 z-20 py-3 px-4 flex justify-end shadow-sm">
              <button
                onClick={handleClose}
                className="p-2.5 text-white bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors shadow-md"
                aria-label={isRTL ? 'إغلاق القائمة' : 'Close menu'}
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            <Sidebar onLinkClick={handleClose} />
          </div>
        </>
      )}
    </>
  );
}
