import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrders, updateOrder, getProducts, updateProduct } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { items, total, customerInfo, paymentIntentId } = await req.json();

    // Create order
    const order = createOrder({
      items,
      total,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerAddress: customerInfo.address,
      customerPhone: customerInfo.phone,
      status: 'pending',
      paymentIntentId,
    });

    // Update product stock
    const products = getProducts();
    items.forEach((item: any) => {
      const product = products.find(p => p.id === item.product.id);
      if (product && product.stock >= item.quantity) {
        updateProduct(product.id, {
          stock: product.stock - item.quantity,
        });
      }
    });

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    const order = updateOrder(id, updates);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
