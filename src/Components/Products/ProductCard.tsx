import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  inCart: boolean;
  inWishlist: boolean;
  cartQuantity?: number;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

export default function ProductCard({
  name,
  price,
  oldPrice,
  rating,
  reviews,
  image,
  inCart,
  inWishlist,
  cartQuantity = 0,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const { t } = useTranslation();
  return (
    <article className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full rounded-2xl" role="listitem">
      <div className="relative bg-gray-50 flex items-center justify-center h-[266px]">
        <img 
          src={image} 
          alt={name}
          className="object-contain w-full h-[266px]"
        />
      </div>

      <div className="flex flex-col px-6 pt-4 pb-6 gap-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-2 min-h-[20px]">
          {!inCart && (
            <>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    style={{
                      width: '14px',
                      height: '14px',
                      opacity: 1,
                      fontSize: '14px',
                      lineHeight: '14px',
                      color: i < rating ? '#FAAE42' : '#D1D5DB'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({reviews})</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full h-[44.59px]">
          <button
            onClick={onAddToCart}
            className={`w-[60%] text-sm font-medium transition-colors rounded-lg ${
              inCart
                ? 'text-white'
                : 'bg-primary-100 text-white hover:bg-primary-200'
            }`}
            style={inCart ? {
              height: '44.59px',
              opacity: 1,
              borderRadius: '8px',
              paddingTop: '11.3px',
              paddingRight: '21px',
              paddingBottom: '12.29px',
              paddingLeft: '21px',
              borderWidth: '1px',
              borderColor: 'transparent',
              backgroundColor: '#05B171'
            } : {
              height: '44.59px'
            }}
          >
            {inCart ? `${t('products.card.inCart')} (${cartQuantity})` : t('products.card.addToCart')}
          </button>

          <button
            onClick={onToggleWishlist}
            className="w-[40%] flex items-center justify-end rounded-lg hover:bg-gray-50 transition-colors pr-1 h-[44.59px]"
            aria-label={t('products.card.addToWishlist')}
          >
            <FontAwesomeIcon
              icon={inWishlist ? faHeartSolid : faHeartRegular}
              className={inWishlist ? 'text-red-500' : 'text-gray-400'}
              style={{
                width: '12.51px',
                height: '14px',
                opacity: 1
              }}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
