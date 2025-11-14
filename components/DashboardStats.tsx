'use client';

import { Product, Order } from '@/types';
import { FiDollarSign, FiShoppingBag, FiPackage, FiTrendingUp, FiUsers, FiAlertCircle } from 'react-icons/fi';

interface DashboardStatsProps {
  products: Product[];
  orders: Order[];
}

export default function DashboardStats({ products, orders }: DashboardStatsProps) {
  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  
  // Calculate average order value
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Calculate total inventory value
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  
  // Orders by status
  const ordersByStatus = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  // Recent orders (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentOrders = orders.filter(o => new Date(o.createdAt) >= sevenDaysAgo).length;
  
  // Revenue this month
  const thisMonth = new Date();
  thisMonth.setDate(1);
  const monthlyRevenue = orders
    .filter(o => new Date(o.createdAt) >= thisMonth)
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      {/* Total Revenue */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-blue-100 text-sm font-medium">總收入</p>
          <FiDollarSign className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
        <p className="text-blue-100 text-xs mt-1">本月: ${monthlyRevenue.toFixed(2)}</p>
      </div>

      {/* Total Orders */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-green-100 text-sm font-medium">總訂單數</p>
          <FiShoppingBag className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">{totalOrders}</p>
        <p className="text-green-100 text-xs mt-1">近7天: {recentOrders} 筆</p>
      </div>

      {/* Average Order Value */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-purple-100 text-sm font-medium">平均訂單金額</p>
          <FiTrendingUp className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">${averageOrderValue.toFixed(2)}</p>
        <p className="text-purple-100 text-xs mt-1">每筆訂單</p>
      </div>

      {/* Total Products */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-orange-100 text-sm font-medium">產品數量</p>
          <FiPackage className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">{totalProducts}</p>
        <p className="text-orange-100 text-xs mt-1">庫存價值: ${totalInventoryValue.toFixed(2)}</p>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-red-100 text-sm font-medium">低庫存警告</p>
          <FiAlertCircle className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">{lowStockProducts}</p>
        <p className="text-red-100 text-xs mt-1">需要補貨</p>
      </div>

      {/* Pending Orders */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-yellow-100 text-sm font-medium">待處理訂單</p>
          <FiShoppingBag className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">{ordersByStatus.pending}</p>
        <p className="text-yellow-100 text-xs mt-1">需要處理</p>
      </div>

      {/* Processing Orders */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-indigo-100 text-sm font-medium">處理中訂單</p>
          <FiTrendingUp className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">{ordersByStatus.processing}</p>
        <p className="text-indigo-100 text-xs mt-1">正在準備</p>
      </div>

      {/* Delivered Orders */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <p className="text-teal-100 text-sm font-medium">已完成訂單</p>
          <FiShoppingBag className="text-2xl opacity-80" />
        </div>
        <p className="text-3xl font-bold">{ordersByStatus.delivered}</p>
        <p className="text-teal-100 text-xs mt-1">已送達</p>
      </div>
    </div>
  );
}

