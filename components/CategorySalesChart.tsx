'use client';

import { Order, Product } from '@/types';

interface CategorySalesChartProps {
  orders: Order[];
  products: Product[];
}

export default function CategorySalesChart({ orders, products }: CategorySalesChartProps) {
  // Calculate sales by category
  const categorySales: Record<string, { revenue: number; quantity: number }> = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      const category = item.product.category;
      if (!categorySales[category]) {
        categorySales[category] = { revenue: 0, quantity: 0 };
      }
      categorySales[category].revenue += item.product.price * item.quantity;
      categorySales[category].quantity += item.quantity;
    });
  });

  const categoryLabels: Record<string, string> = {
    beef: '牛肉',
    pork: '豬肉',
    chicken: '雞肉',
    lamb: '羊肉',
    seafood: '海鮮',
    other: '其他',
  };

  const totalRevenue = Object.values(categorySales).reduce((sum, cat) => sum + cat.revenue, 0);
  const maxRevenue = Math.max(...Object.values(categorySales).map(cat => cat.revenue), 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">類別銷售分析</h3>
      <div className="space-y-4">
        {Object.entries(categorySales)
          .sort((a, b) => b[1].revenue - a[1].revenue)
          .map(([category, data]) => {
            const percentage = totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0;
            const barWidth = (data.revenue / maxRevenue) * 100;
            
            return (
              <div key={category}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">
                      {categoryLabels[category] || category}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({data.quantity} 件)
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary-600">
                    ${data.revenue.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% 總收入</p>
              </div>
            );
          })}
        {Object.keys(categorySales).length === 0 && (
          <p className="text-gray-500 text-center py-4">尚無銷售資料</p>
        )}
      </div>
    </div>
  );
}

