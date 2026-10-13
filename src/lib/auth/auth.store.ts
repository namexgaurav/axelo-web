import { writable, derived } from 'svelte/store';
import type { Session, User } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserRole = Database['public']['Tables']['user_roles']['Row'];

export const session = writable<Session | null>(null);
export const user = writable<User | null>(null);
export const profile = writable<Profile | null>(null);
export const role = writable<'customer' | 'admin' | null>(null);
export const authLoading = writable<boolean>(true);

export const isAuthenticated = derived(user, ($user) => $user !== null);
export const isAdmin = derived(role, ($role) => $role === 'admin');

export function setAuthState(
	newSession: Session | null,
	newUser: User | null,
	newProfile: Profile | null = null,
	newRole: 'customer' | 'admin' | null = null
) {
	session.set(newSession);
	user.set(newUser);
	profile.set(newProfile);
	role.set(newRole);
	authLoading.set(false);
}

export function clearAuthState() {
	session.set(null);
	user.set(null);
	profile.set(null);
	role.set(null);
	authLoading.set(false);
}
