import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';
import type { CartItem, Product } from '$lib/types';
import { fetchProductBySlug } from '$lib/products/product.service';

export async function getOrCreateCart(supabase: SupabaseClient<Database, any, any>, userId: string) {
	// Look up existing cart
	let { data: cart, error } = await supabase
		.from('carts')
		.select('*')
		.eq('user_id', userId)
		.maybeSingle();

	if (!cart) {
		const { data: newCart, error: createError } = await supabase
			.from('carts')
			.insert({ user_id: userId })
			.select()
			.single();

		if (createError) throw createError;
		cart = newCart;
	}

	return cart;
}

export async function fetchDbCartItems(
	supabase: SupabaseClient<Database, any, any>,
	cartId: string
): Promise<CartItem[]> {
	const { data, error } = await supabase
		.from('cart_items')
		.select('*')
		.eq('cart_id', cartId);

	if (error || !data) return [];

	const items: CartItem[] = [];
	for (const row of data) {
		const prod = await fetchProductBySlug(supabase, row.product_id);
		if (prod) {
			items.push({
				product: prod,
				selectedColor: row.selected_color || prod.colors[0]?.name || 'Standard',
				quantity: row.quantity
			});
		}
	}

	return items;
}

export async function addDbCartItem(
	supabase: SupabaseClient<Database, any, any>,
	cartId: string,
	productId: string,
	selectedColor: string,
	quantity: number = 1
) {
	// Check if already in cart
	const { data: existing } = await supabase
		.from('cart_items')
		.select('id, quantity')
		.eq('cart_id', cartId)
		.eq('product_id', productId)
		.eq('selected_color', selectedColor)
		.maybeSingle();

	if (existing) {
		return supabase
			.from('cart_items')
			.update({
				quantity: existing.quantity + quantity,
				updated_at: new Date().toISOString()
			})
			.eq('id', existing.id);
	} else {
		return supabase
			.from('cart_items')
			.insert({
				cart_id: cartId,
				product_id: productId,
				quantity,
				selected_color: selectedColor
			});
	}
}

export async function updateDbCartItemQty(
	supabase: SupabaseClient<Database, any, any>,
	cartId: string,
	productId: string,
	selectedColor: string,
	newQuantity: number
) {
	if (newQuantity <= 0) {
		return supabase
			.from('cart_items')
			.delete()
			.eq('cart_id', cartId)
			.eq('product_id', productId)
			.eq('selected_color', selectedColor);
	}

	return supabase
		.from('cart_items')
		.update({
			quantity: newQuantity,
			updated_at: new Date().toISOString()
		})
		.eq('cart_id', cartId)
		.eq('product_id', productId)
		.eq('selected_color', selectedColor);
}

export async function removeDbCartItem(
	supabase: SupabaseClient<Database, any, any>,
	cartId: string,
	productId: string,
	selectedColor: string
) {
	return supabase
		.from('cart_items')
		.delete()
		.eq('cart_id', cartId)
		.eq('product_id', productId)
		.eq('selected_color', selectedColor);
}

export async function clearDbCart(supabase: SupabaseClient<Database, any, any>, cartId: string) {
	return supabase
		.from('cart_items')
		.delete()
		.eq('cart_id', cartId);
}
