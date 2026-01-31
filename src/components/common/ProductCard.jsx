/**
 * ProductCard component
 * Displays individual product with image, details, and purchase link
 */

import { Badge } from '../ui';
import { ExternalLink } from 'lucide-react';

const ProductCard = ({ product }) => {
  const {
    description,
    price,
    priceAfterDiscount,
    discount,
    tag,
    imgHeight,
    bgUrl,
    flipkartLink
  } = product;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stroke bg-surface hover:shadow-2xl transition-all duration-300">
      {/* Product Image */}
      <div className={`${imgHeight} ${bgUrl} bg-cover bg-center relative overflow-hidden`}>
        {tag && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="primary" size="small">
              {tag}
            </Badge>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={flipkartLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-surface text-ink font-semibold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer hover:bg-ink hover:text-surface"
          >
            View on Flipkart
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-ink mb-3 line-clamp-2">
          {description}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-ink">
            {priceAfterDiscount}
          </span>
          <span className="text-lg text-muted line-through">
            {price}
          </span>
        </div>

        {/* Discount Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="success" size="small">
            {discount}
          </Badge>
          
          <a
            href={flipkartLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            View Details
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
