'use client';

import { Order } from '@/types';
import { FiClock, FiCheckCircle, FiTruck, FiPackage } from 'react-icons/fi';

interface RecentTransactionsProps {
  orders: Order[];
}

export default function RecentTransactions({ orders }: RecentTransactionsProps) {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />;
      case 'shipped':
        return <FiTruck className="text-blue-500" />;
      case 'processing':
        return <FiPackage className="text-indigo-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      pending: '待處理',
      processing: '處理中',
      shipped: '已出貨',
      delivered: '已送達',
      cancelled: '已取消',
    };
    return labels[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">最近交易</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-semibold text-gray-900">訂單 #{order.id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleString('zh-HK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {order.items.length} 項商品
              </p>
            </div>
          </div>
        ))}
        {recentOrders.length === 0 && (
          <p className="text-gray-500 text-center py-8">尚無交易記錄</p>
        )}
      </div>
    </div>
  );
}

