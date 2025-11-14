'use client';

import { Order } from '@/types';

interface OrderStatusChartProps {
  orders: Order[];
}

export default function OrderStatusChart({ orders }: OrderStatusChartProps) {
  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const total = orders.length;
  const statusLabels = {
    pending: '待處理',
    processing: '處理中',
    shipped: '已出貨',
    delivered: '已送達',
    cancelled: '已取消',
  };
  const statusColors = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    shipped: 'bg-indigo-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">訂單狀態分佈</h3>
      <div className="space-y-3">
        {Object.entries(statusCounts).map(([status, count]) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={status}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{statusLabels[status as keyof typeof statusLabels]}</span>
                <span className="text-sm font-semibold text-gray-900">{count} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${statusColors[status as keyof typeof statusColors]} h-2 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

