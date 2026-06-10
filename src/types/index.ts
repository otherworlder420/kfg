export interface QuoteFormData {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  website: string;
  productInterest: string[];
  quantity: string;
  quantityUnit: string;
  packaging: string;
  destinationPort: string;
  deliveryTerms: string;
  specialRequirements: string;
  howFound: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  categoryId: string;
  tags: readonly string[];
  readTime: string;
  featured: boolean;
  author: string;
  authorRole: string;
  type: "kfg" | "industry";
  image: string;
  source?: string;
  sourceUrl?: string;
  gallery?: readonly string[];
}

export interface NewsCategory {
  id: string;
  label: string;
  description: string;
}
