import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar/Sidebar';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed top-0 left-0 h-full w-64 bg-primary-50 z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}






