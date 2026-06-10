import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-cream-100 rounded-xl border border-dark-200 shadow-card overflow-hidden hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-400 cursor-pointer block"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-medium text-dark-800 group-hover:text-gold-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-dark-600 mt-2 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mt-4 text-gold-400 text-sm font-medium">
          <span className="link-underline">Learn More</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
