import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';

export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];

export interface OrderWithItems extends Order {
	order_items?: OrderItem[];
}

export async function fetchUserOrders(supabase: SupabaseClient<Database, any, any>, userId: string) {
	const { data, error } = await supabase
		.from('orders')
		.select('*, order_items(*)')
		.eq('user_id', userId)
		.order('created_at', { ascending: false });

	return { data: (data as OrderWithItems[]) || [], error };
}

export async function fetchOrderDetails(supabase: SupabaseClient<Database, any, any>, orderId: string) {
	const { data, error } = await supabase
		.from('orders')
		.select('*, order_items(*)')
		.eq('id', orderId)
		.single();

	return { data: data as OrderWithItems | null, error };
}

export async function placeSecureOrder(
	supabase: SupabaseClient<Database, any, any>,
	shippingAddress: Record<string, any>,
	paymentMethod: string = 'card'
) {
	const { data, error } = await supabase.rpc('create_order_secure', {
		p_shipping_address: shippingAddress,
		p_payment_method: paymentMethod
	});

	return { data, error };
}
