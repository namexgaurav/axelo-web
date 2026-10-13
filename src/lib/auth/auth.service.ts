import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';
import { clearAuthState, setAuthState } from './auth.store';

export type Profile = Database['public']['Tables']['profiles']['Row'];

/**
 * Send an OTP code to user's email address.
 * Supabase auth will send a 6-digit verification code.
 */
export async function sendEmailOtp(supabase: SupabaseClient<Database, any, any>, email: string) {
	const trimmedEmail = email.trim().toLowerCase();
	if (!trimmedEmail || !trimmedEmail.includes('@')) {
		return { error: new Error('Please enter a valid email address.') };
	}

	const { data, error } = await supabase.auth.signInWithOtp({
		email: trimmedEmail,
		options: {
			shouldCreateUser: true
		}
	});

	return { data, error };
}

/**
 * Send an OTP code to user's mobile phone.
 * Phone number must include E.164 country code (+91XXXXXXXXXX).
 */
export async function sendPhoneOtp(supabase: SupabaseClient<Database, any, any>, phone: string) {
	const cleanPhone = phone.trim().replace(/\s+/g, '');
	if (!cleanPhone.startsWith('+')) {
		return { error: new Error('Phone number must include country code (e.g. +91).') };
	}

	const { data, error } = await supabase.auth.signInWithOtp({
		phone: cleanPhone,
		options: {
			channel: 'sms',
			shouldCreateUser: true
		}
	});

	return { data, error };
}

/**
 * Verify Email OTP token
 */
export async function verifyEmailOtp(supabase: SupabaseClient<Database, any, any>, email: string, token: string) {
	const trimmedEmail = email.trim().toLowerCase();
	const trimmedToken = token.trim();

	const { data, error } = await supabase.auth.verifyOtp({
		email: trimmedEmail,
		token: trimmedToken,
		type: 'email'
	});

	return { data, error };
}

/**
 * Verify Phone / SMS OTP token
 */
export async function verifyPhoneOtp(supabase: SupabaseClient<Database, any, any>, phone: string, token: string) {
	const cleanPhone = phone.trim().replace(/\s+/g, '');
	const trimmedToken = token.trim();

	const { data, error } = await supabase.auth.verifyOtp({
		phone: cleanPhone,
		token: trimmedToken,
		type: 'sms'
	});

	return { data, error };
}

/**
 * Sign out user and clear local auth store
 */
export async function signOut(supabase: SupabaseClient<Database, any, any>) {
	const { error } = await supabase.auth.signOut();
	clearAuthState();
	return { error };
}

/**
 * Fetch customer profile by user ID
 */
export async function fetchProfile(supabase: SupabaseClient<Database, any, any>, userId: string) {
	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.maybeSingle();

	return { data, error };
}

/**
 * Fetch user role
 */
export async function fetchUserRole(supabase: SupabaseClient<Database, any, any>, userId: string) {
	const { data, error } = await supabase
		.from('user_roles')
		.select('role')
		.eq('user_id', userId)
		.maybeSingle();

	return { role: (data?.role as 'customer' | 'admin') || 'customer', error };
}

/**
 * Update customer profile
 */
export async function updateProfile(
	supabase: SupabaseClient<Database, any, any>,
	userId: string,
	updates: Database['public']['Tables']['profiles']['Update']
) {
	const { data, error } = await supabase
		.from('profiles')
		.update({
			...updates,
			updated_at: new Date().toISOString()
		})
		.eq('id', userId)
		.select()
		.single();

	return { data, error };
}
