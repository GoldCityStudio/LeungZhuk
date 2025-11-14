'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Order } from '@/types';
import { FiPackage, FiDollarSign, FiShoppingBag, FiPlus, FiEdit, FiTrash2, FiLogOut, FiBarChart2 } from 'react-icons/fi';
import DashboardStats from './DashboardStats';
import OrderStatusChart from './OrderStatusChart';
import CategorySalesChart from './CategorySalesChart';
import RecentTransactions from './RecentTransactions';
import InventoryStatus from './InventoryStatus';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    description: string;
    price: string;
    image: string;
    category: 'beef' | 'pork' | 'chicken' | 'lamb' | 'seafood' | 'other';
    stock: string;
    unit: string;
  }>({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'beef',
    stock: '',
    unit: 'lb',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use Firestore API client
      const { productAPI, orderAPI } = await import('@/lib/apiClient');
      const [productsData, ordersData] = await Promise.all([
        productAPI.getAll(),
        orderAPI.getAll(),
      ]);
      setProducts(productsData.products || []);
      setOrders(ordersData.orders || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
      };

      const { productAPI } = await import('@/lib/apiClient');
      if (editingProduct) {
        await productAPI.update(editingProduct.id, productData);
      } else {
        await productAPI.create(productData);
      }

      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'beef',
        stock: '',
        unit: 'lb',
      });
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('儲存產品失敗');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
      unit: product.unit,
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('您確定要刪除此產品嗎？')) return;

    try {
      const { productAPI } = await import('@/lib/apiClient');
      await productAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('刪除產品失敗');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { orderAPI } = await import('@/lib/apiClient');
      await orderAPI.update(orderId, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('更新訂單狀態失敗');
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">管理員控制台</h1>
          <p className="text-gray-600">管理您的庫存和訂單</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={async () => {
              try {
                const { initializeFakeDataFirestore } = await import('@/lib/initFakeDataFirestore');
                await initializeFakeDataFirestore();
                fetchData();
                alert('假資料已重新初始化！');
              } catch (error) {
                console.error('Init error:', error);
                alert('初始化失敗');
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
          >
            初始化假資料
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
          >
            <FiLogOut />
            登出
          </button>
        </div>
      </div>

      {/* Enhanced Stats */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      ) : (
        <>
          <DashboardStats products={products} orders={orders} />
        </>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiBarChart2 />
              儀表板
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'products'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              產品
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'orders'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              訂單
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderStatusChart orders={orders} />
                <CategorySalesChart orders={orders} products={products} />
              </div>
              
              {/* Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InventoryStatus products={products} />
                <RecentTransactions orders={orders} />
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">產品庫存</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      description: '',
                      price: '',
                      image: '',
                      category: 'beef',
                      stock: '',
                      unit: 'lb',
                    });
                    setShowProductModal(true);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
                >
                  <FiPlus />
                  新增產品
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">載入中...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">名稱</th>
                        <th className="text-left py-3 px-4">類別</th>
                        <th className="text-left py-3 px-4">價格</th>
                        <th className="text-left py-3 px-4">庫存</th>
                        <th className="text-left py-3 px-4">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">{product.category === 'beef' ? '牛肉' : product.category === 'pork' ? '豬肉' : product.category === 'chicken' ? '雞肉' : product.category === 'lamb' ? '羊肉' : product.category === 'seafood' ? '海鮮' : '其他'}</td>
                          <td className="py-3 px-4">${product.price}</td>
                          <td className={`py-3 px-4 ${product.stock < 10 ? 'text-orange-600 font-semibold' : ''}`}>
                            {product.stock} {product.unit}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <FiEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">訂單</h2>
              {loading ? (
                <div className="text-center py-8">載入中...</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">訂單 #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerEmail}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="mt-2 px-3 py-1 border rounded-lg text-sm"
                          >
                            <option value="pending">待處理</option>
                            <option value="processing">處理中</option>
                            <option value="shipped">已出貨</option>
                            <option value="delivered">已送達</option>
                            <option value="cancelled">已取消</option>
                          </select>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium mb-2">商品：</p>
                        <ul className="space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              {item.product.name} x {item.quantity} - ${(item.product.price * item.quantity).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">尚無訂單</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingProduct ? '編輯產品' : '新增產品'}
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名稱</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">價格</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">庫存</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">類別</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="beef">牛肉</option>
                    <option value="pork">豬肉</option>
                    <option value="chicken">雞肉</option>
                    <option value="lamb">羊肉</option>
                    <option value="seafood">海鮮</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">單位</label>
                  <select
                    value={productForm.unit}
                    onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="lb">磅</option>
                    <option value="kg">公斤</option>
                    <option value="piece">件</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">圖片網址</label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  {editingProduct ? '更新' : '建立'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

