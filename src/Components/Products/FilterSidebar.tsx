import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { ProductFilters } from '../../types';

interface FilterSidebarProps {
  onFilterChange: (filters: ProductFilters) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 2000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    keywords: true,
    categories: true,
    price: true,
    colors: true
  });

  // Apply filters whenever any filter changes
  useEffect(() => {
    onFilterChange({
      keyword,
      categories: selectedCategories,
      priceRange,
      colors: selectedColors
    });
  }, [keyword, selectedCategories, priceRange, selectedColors, onFilterChange]);

  const categories = [
    { id: 'all', label: t('products.filterSidebar.all') },
    { id: 'beverages', label: t('products.filters.beverages') },
    { id: 'snacks', label: t('products.filters.snacks') },
    { id: 'food', label: t('products.filters.food') },
  ];

  const colors = [
    { id: 'cyan', color: 'bg-cyan-500' },
    { id: 'green', color: 'bg-green-500' },
    { id: 'pink', color: 'bg-pink-500' },
    { id: 'lime', color: 'bg-lime-500' },
    { id: 'yellow', color: 'bg-yellow-500' },
    { id: 'orange', color: 'bg-orange-500' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(c => c !== categoryId && c !== 'all')
        : [...selectedCategories.filter(c => c !== 'all'), categoryId];
      setSelectedCategories(newCategories.length === 0 ? ['all'] : newCategories);
    }
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId) ? prev.filter(c => c !== colorId) : [...prev, colorId]
    );
  };

  return (
    <aside className="w-full lg:w-[33.3%] bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24" role="complementary" aria-label="Product filters">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('products.filterSidebar.title')}</h2>

      <div className="space-y-5">
        {/* Keywords Section */}
        <div>
          <button
            onClick={() => toggleSection('keywords')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.keywords')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.keywords ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.keywords && (
            <div className="relative mt-1">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t('products.filterSidebar.keywordsPlaceholder')}
                className="w-full pl-4 pr-10 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div>
          <div className="h-2 bg-primary-50 -mx-6 mb-2 rounded"></div>
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.categories')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.categories ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.categories && (
            <div className="space-y-1 mt-1">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-primary-100 rounded border-gray-300 focus:ring-primary-100"
                  />
                  <span className="text-sm text-gray-700">{category.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Section */}
        <div>
          <div className="h-2 bg-primary-50 -mx-6 mb-2 rounded"></div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.price')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.price ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.price && (
            <div className="space-y-2 mt-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-600">$</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 1, priceRange[1]])}
                    className="w-12 bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 rounded border border-gray-200">
                  <span className="text-xs text-gray-600">$</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                    className="w-16 bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="relative pt-4 pb-1">
                <div className="relative h-1.5 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-primary-100 rounded-full"
                    style={{
                      left: `${(priceRange[0] / 2000) * 100}%`,
                      right: `${100 - (priceRange[1] / 2000) * 100}%`
                    }}
                  />
                  
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val < priceRange[1]) {
                        setPriceRange([val, priceRange[1]]);
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-100 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-100 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: priceRange[0] > 1000 ? 5 : 3 }}
                  />
                  
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > priceRange[0]) {
                        setPriceRange([priceRange[0], val]);
                      }
                    }}
                    className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-100 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-100 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: priceRange[1] <= 1000 ? 5 : 3 }}
                  />
                </div>
                
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>$1</span>
                  <span>$500</span>
                  <span>$1,000</span>
                  <span>$1,500</span>
                  <span>$2,000</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colors Section */}
        <div>
          <div className="h-2 bg-primary-50 -mx-6 mb-2 rounded"></div>
          <button
            onClick={() => toggleSection('colors')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.colors')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.colors ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.colors && (
            <div className="flex items-center gap-2 mt-1">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={`w-6 h-6 rounded ${color.color} relative ${
                    selectedColors.includes(color.id) ? 'ring-2 ring-gray-900 ring-offset-2' : ''
                  }`}
                >
                  {selectedColors.includes(color.id) && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
