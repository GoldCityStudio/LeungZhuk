import { getProduct, getProducts } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </main>
    </div>
  );
}

