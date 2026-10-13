import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';

export type Address = Database['public']['Tables']['addresses']['Row'];
export type AddressInsert = Database['public']['Tables']['addresses']['Insert'];
export type AddressUpdate = Database['public']['Tables']['addresses']['Update'];

export async function fetchAddresses(supabase: SupabaseClient<Database, any, any>, userId: string) {
	const { data, error } = await supabase
		.from('addresses')
		.select('*')
		.eq('user_id', userId)
		.order('is_default', { ascending: false })
		.order('created_at', { ascending: false });

	return { data: data || [], error };
}

export async function createAddress(supabase: SupabaseClient<Database, any, any>, address: AddressInsert) {
	const { data, error } = await supabase
		.from('addresses')
		.insert(address)
		.select()
		.single();

	return { data, error };
}

export async function updateAddress(
	supabase: SupabaseClient<Database, any, any>,
	addressId: string,
	updates: AddressUpdate
) {
	const { data, error } = await supabase
		.from('addresses')
		.update({
			...updates,
			updated_at: new Date().toISOString()
		})
		.eq('id', addressId)
		.select()
		.single();

	return { data, error };
}

export async function deleteAddress(supabase: SupabaseClient<Database, any, any>, addressId: string) {
	const { error } = await supabase
		.from('addresses')
		.delete()
		.eq('id', addressId);

	return { error };
}

export async function setDefaultAddress(
	supabase: SupabaseClient<Database, any, any>,
	userId: string,
	addressId: string
) {
	// First unset all defaults for user
	await supabase
		.from('addresses')
		.update({ is_default: false })
		.eq('user_id', userId);

	// Then set the selected address as default
	const { data, error } = await supabase
		.from('addresses')
		.update({ is_default: true, updated_at: new Date().toISOString() })
		.eq('id', addressId)
		.select()
		.single();

	return { data, error };
}
