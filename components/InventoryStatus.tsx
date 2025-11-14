'use client';

import { Product } from '@/types';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

interface InventoryStatusProps {
  products: Product[];
}

export default function InventoryStatus({ products }: InventoryStatusProps) {
  const lowStockProducts = products.filter(p => p.stock < 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const healthyStockProducts = products.filter(p => p.stock >= 10);

  const categoryLabels: Record<string, string> = {
    beef: '牛肉',
    pork: '豬肉',
    chicken: '雞肉',
    lamb: '羊肉',
    seafood: '海鮮',
    other: '其他',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">庫存狀態</h3>
      
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{healthyStockProducts.length}</p>
          <p className="text-xs text-gray-600 mt-1">正常庫存</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</p>
          <p className="text-xs text-gray-600 mt-1">低庫存</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</p>
          <p className="text-xs text-gray-600 mt-1">缺貨</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FiAlertTriangle className="text-yellow-500" />
            <h4 className="font-semibold text-gray-900">低庫存警告</h4>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-600">
                    {categoryLabels[product.category] || product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-600">
                    {product.stock} {product.unit === 'lb' ? '磅' : product.unit === 'kg' ? '公斤' : '件'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Out of Stock Alert */}
      {outOfStockProducts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FiAlertTriangle className="text-red-500" />
            <h4 className="font-semibold text-gray-900">缺貨產品</h4>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {outOfStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-600">
                    {categoryLabels[product.category] || product.category}
                  </p>
                </div>
                <p className="text-sm font-bold text-red-600">缺貨</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
        <div className="text-center py-4">
          <FiCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
          <p className="text-gray-600">所有產品庫存正常</p>
        </div>
      )}
    </div>
  );
}

