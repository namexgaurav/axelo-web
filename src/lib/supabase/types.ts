// Database types — will be generated from Supabase schema
// For now, using a placeholder that allows the app to compile

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					full_name: string | null;
					display_name: string | null;
					email: string | null;
					phone: string | null;
					profile_complete: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					full_name?: string | null;
					display_name?: string | null;
					email?: string | null;
					phone?: string | null;
					profile_complete?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					full_name?: string | null;
					display_name?: string | null;
					email?: string | null;
					phone?: string | null;
					profile_complete?: boolean;
					updated_at?: string;
				};
				Relationships: [];
			};
			user_roles: {
				Row: {
					id: string;
					user_id: string;
					role: 'customer' | 'admin';
					created_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					role?: 'customer' | 'admin';
					created_at?: string;
				};
				Update: {
					role?: 'customer' | 'admin';
				};
				Relationships: [];
			};
			categories: {
				Row: {
					id: string;
					name: string;
					slug: string;
					description: string | null;
					image_path: string | null;
					parent_id: string | null;
					sort_order: number;
					is_active: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					slug: string;
					description?: string | null;
					image_path?: string | null;
					parent_id?: string | null;
					sort_order?: number;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					name?: string;
					slug?: string;
					description?: string | null;
					image_path?: string | null;
					parent_id?: string | null;
					sort_order?: number;
					is_active?: boolean;
					updated_at?: string;
				};
				Relationships: [];
			};
			products: {
				Row: {
					id: string;
					name: string;
					slug: string;
					short_description: string | null;
					description: string | null;
					sku: string | null;
					category_id: string | null;
					status: 'draft' | 'published' | 'archived';
					base_price: number;
					sale_price: number | null;
					currency: string;
					stock_quantity: number;
					track_inventory: boolean;
					is_featured: boolean;
					is_new_arrival: boolean;
					is_best_seller: boolean;
					sort_order: number;
					seo_title: string | null;
					seo_description: string | null;
					created_at: string;
					updated_at: string;
					published_at: string | null;
				};
				Insert: {
					id?: string;
					name: string;
					slug: string;
					short_description?: string | null;
					description?: string | null;
					sku?: string | null;
					category_id?: string | null;
					status?: 'draft' | 'published' | 'archived';
					base_price: number;
					sale_price?: number | null;
					currency?: string;
					stock_quantity?: number;
					track_inventory?: boolean;
					is_featured?: boolean;
					is_new_arrival?: boolean;
					is_best_seller?: boolean;
					sort_order?: number;
					seo_title?: string | null;
					seo_description?: string | null;
					created_at?: string;
					updated_at?: string;
					published_at?: string | null;
				};
				Update: {
					name?: string;
					slug?: string;
					short_description?: string | null;
					description?: string | null;
					sku?: string | null;
					category_id?: string | null;
					status?: 'draft' | 'published' | 'archived';
					base_price?: number;
					sale_price?: number | null;
					currency?: string;
					stock_quantity?: number;
					track_inventory?: boolean;
					is_featured?: boolean;
					is_new_arrival?: boolean;
					is_best_seller?: boolean;
					sort_order?: number;
					seo_title?: string | null;
					seo_description?: string | null;
					updated_at?: string;
					published_at?: string | null;
				};
				Relationships: [];
			};
			product_images: {
				Row: {
					id: string;
					product_id: string;
					storage_path: string;
					alt_text: string | null;
					display_order: number;
					is_primary: boolean;
					created_at: string;
				};
				Insert: {
					id?: string;
					product_id: string;
					storage_path: string;
					alt_text?: string | null;
					display_order?: number;
					is_primary?: boolean;
					created_at?: string;
				};
				Update: {
					storage_path?: string;
					alt_text?: string | null;
					display_order?: number;
					is_primary?: boolean;
				};
				Relationships: [];
			};
			product_variants: {
				Row: {
					id: string;
					product_id: string;
					variant_name: string;
					sku: string | null;
					price_override: number | null;
					sale_price_override: number | null;
					stock_quantity: number;
					is_active: boolean;
					attributes: Json;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					product_id: string;
					variant_name: string;
					sku?: string | null;
					price_override?: number | null;
					sale_price_override?: number | null;
					stock_quantity?: number;
					is_active?: boolean;
					attributes?: Json;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					variant_name?: string;
					sku?: string | null;
					price_override?: number | null;
					sale_price_override?: number | null;
					stock_quantity?: number;
					is_active?: boolean;
					attributes?: Json;
					updated_at?: string;
				};
				Relationships: [];
			};
			addresses: {
				Row: {
					id: string;
					user_id: string;
					full_name: string;
					phone: string;
					street_line_1: string;
					street_line_2: string | null;
					city: string;
					state: string;
					postal_code: string;
					country: string;
					is_default: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					full_name: string;
					phone: string;
					street_line_1: string;
					street_line_2?: string | null;
					city: string;
					state: string;
					postal_code: string;
					country?: string;
					is_default?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					full_name?: string;
					phone?: string;
					street_line_1?: string;
					street_line_2?: string | null;
					city?: string;
					state?: string;
					postal_code?: string;
					country?: string;
					is_default?: boolean;
					updated_at?: string;
				};
				Relationships: [];
			};
			carts: {
				Row: {
					id: string;
					user_id: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					updated_at?: string;
				};
				Relationships: [];
			};
			cart_items: {
				Row: {
					id: string;
					cart_id: string;
					product_id: string;
					variant_id: string | null;
					quantity: number;
					selected_color: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					cart_id: string;
					product_id: string;
					variant_id?: string | null;
					quantity?: number;
					selected_color?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					quantity?: number;
					selected_color?: string | null;
					updated_at?: string;
				};
				Relationships: [];
			};
			orders: {
				Row: {
					id: string;
					order_number: string;
					user_id: string;
					status: string;
					payment_status: string;
					currency: string;
					subtotal: number;
					discount: number;
					shipping_fee: number;
					tax: number;
					total: number;
					shipping_address: any;
					payment_method: string;
					payment_gateway_order_id: string | null;
					payment_gateway_payment_id: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					order_number: string;
					user_id: string;
					status?: string;
					payment_status?: string;
					currency?: string;
					subtotal: number;
					discount?: number;
					shipping_fee?: number;
					tax?: number;
					total: number;
					shipping_address: any;
					payment_method?: string;
					payment_gateway_order_id?: string | null;
					payment_gateway_payment_id?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					status?: string;
					payment_status?: string;
					shipping_fee?: number;
					tax?: number;
					total?: number;
					payment_gateway_order_id?: string | null;
					payment_gateway_payment_id?: string | null;
					updated_at?: string;
				};
				Relationships: [];
			};
			order_items: {
				Row: {
					id: string;
					order_id: string;
					product_id: string;
					variant_id: string | null;
					product_name: string;
					variant_name: string | null;
					unit_price: number;
					quantity: number;
					total_price: number;
					image_url: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					order_id: string;
					product_id: string;
					variant_id?: string | null;
					product_name: string;
					variant_name?: string | null;
					unit_price: number;
					quantity: number;
					total_price: number;
					image_url?: string | null;
					created_at?: string;
				};
				Update: {
					quantity?: number;
					total_price?: number;
				};
				Relationships: [];
			};
			banners: {
				Row: {
					id: string;
					internal_name: string;
					headline: string | null;
					subtitle: string | null;
					image_path: string | null;
					mobile_image_path: string | null;
					cta_label: string | null;
					cta_destination: string | null;
					placement: string;
					display_order: number;
					is_active: boolean;
					starts_at: string | null;
					ends_at: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					internal_name: string;
					headline?: string | null;
					subtitle?: string | null;
					image_path?: string | null;
					mobile_image_path?: string | null;
					cta_label?: string | null;
					cta_destination?: string | null;
					placement?: string;
					display_order?: number;
					is_active?: boolean;
					starts_at?: string | null;
					ends_at?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					internal_name?: string;
					headline?: string | null;
					subtitle?: string | null;
					image_path?: string | null;
					mobile_image_path?: string | null;
					cta_label?: string | null;
					cta_destination?: string | null;
					placement?: string;
					display_order?: number;
					is_active?: boolean;
					starts_at?: string | null;
					ends_at?: string | null;
					updated_at?: string;
				};
				Relationships: [];
			};
			homepage_sections: {
				Row: {
					id: string;
					section_key: string;
					section_title: string | null;
					section_subtitle: string | null;
					section_type: string;
					display_order: number;
					is_active: boolean;
					config: Json;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					section_key: string;
					section_title?: string | null;
					section_subtitle?: string | null;
					section_type: string;
					display_order?: number;
					is_active?: boolean;
					config?: Json;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					section_key?: string;
					section_title?: string | null;
					section_subtitle?: string | null;
					section_type?: string;
					display_order?: number;
					is_active?: boolean;
					config?: Json;
					updated_at?: string;
				};
				Relationships: [];
			};
			offers: {
				Row: {
					id: string;
					name: string;
					description: string | null;
					discount_type: 'percentage' | 'fixed';
					discount_value: number;
					applies_to: 'product' | 'category' | 'cart';
					target_id: string | null;
					coupon_code: string | null;
					min_cart_value: number | null;
					max_discount: number | null;
					starts_at: string | null;
					ends_at: string | null;
					usage_limit: number | null;
					per_customer_limit: number | null;
					times_used: number;
					is_active: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					description?: string | null;
					discount_type: 'percentage' | 'fixed';
					discount_value: number;
					applies_to?: 'product' | 'category' | 'cart';
					target_id?: string | null;
					coupon_code?: string | null;
					min_cart_value?: number | null;
					max_discount?: number | null;
					starts_at?: string | null;
					ends_at?: string | null;
					usage_limit?: number | null;
					per_customer_limit?: number | null;
					times_used?: number;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					name?: string;
					description?: string | null;
					discount_type?: 'percentage' | 'fixed';
					discount_value?: number;
					applies_to?: 'product' | 'category' | 'cart';
					target_id?: string | null;
					coupon_code?: string | null;
					min_cart_value?: number | null;
					max_discount?: number | null;
					starts_at?: string | null;
					ends_at?: string | null;
					usage_limit?: number | null;
					per_customer_limit?: number | null;
					is_active?: boolean;
					updated_at?: string;
				};
				Relationships: [];
			};
			audit_log: {
				Row: {
					id: string;
					actor_id: string | null;
					action: string;
					entity_type: string;
					entity_id: string | null;
					metadata: Json;
					created_at: string;
				};
				Insert: {
					id?: string;
					actor_id?: string | null;
					action: string;
					entity_type: string;
					entity_id?: string | null;
					metadata?: Json;
					created_at?: string;
				};
				Update: {};
				Relationships: [];
			};
		};
		Views: {};
		Functions: {
			is_admin: {
				Args: Record<string, never>;
				Returns: boolean;
			};
			create_order_from_cart: {
				Args: {
					p_address_id: string;
				};
				Returns: Json;
			};
		};
		Enums: {
			product_status: 'draft' | 'published' | 'archived';
			order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
			payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
			discount_type: 'percentage' | 'fixed';
			offer_applies_to: 'product' | 'category' | 'cart';
			user_role: 'customer' | 'admin';
		};
	};
}
