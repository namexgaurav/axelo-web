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
			categories: {
				Row: {
					id: string;
					name: string;
					slug: string;
					subtitle: string | null;
					description: string | null;
					image_path: string | null;
					parent_id: string | null;
					sort_order: number;
					is_active: boolean;
					is_featured: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					slug: string;
					subtitle?: string | null;
					description?: string | null;
					image_path?: string | null;
					parent_id?: string | null;
					sort_order?: number;
					is_active?: boolean;
					is_featured?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					name?: string;
					slug?: string;
					subtitle?: string | null;
					description?: string | null;
					image_path?: string | null;
					parent_id?: string | null;
					sort_order?: number;
					is_active?: boolean;
					is_featured?: boolean;
					updated_at?: string;
				};
				Relationships: [];
			};
			products: {
				Row: {
					id: string;
					name: string;
					slug: string;
					tagline: string | null;
					short_description: string | null;
					description: string | null;
					sku: string | null;
					category_id: string | null;
					status: 'draft' | 'published' | 'archived';
					base_price: number | null;
					sale_price: number | null;
					currency: string | null;
					stock_quantity: number | null;
					track_inventory: boolean;
					rating: number | null;
					rating_count: number | null;
					badge: string | null;
					is_featured: boolean;
					is_new_arrival: boolean;
					is_best_seller: boolean;
					sort_order: number;
					specs: Json;
					details: Json;
					highlights: Json;
					amazon_url: string | null;
					amazon_button_label: string | null;
					brand_name: string | null;
					seo_title: string | null;
					seo_description: string | null;
					seo_og_image_path: string | null;
					created_at: string;
					updated_at: string;
					published_at: string | null;
				};
				Insert: {
					id?: string;
					name: string;
					slug: string;
					tagline?: string | null;
					short_description?: string | null;
					description?: string | null;
					sku?: string | null;
					category_id?: string | null;
					status?: 'draft' | 'published' | 'archived';
					base_price?: number | null;
					sale_price?: number | null;
					currency?: string | null;
					stock_quantity?: number | null;
					track_inventory?: boolean;
					badge?: string | null;
					is_featured?: boolean;
					is_new_arrival?: boolean;
					is_best_seller?: boolean;
					sort_order?: number;
					specs?: Json;
					details?: Json;
					highlights?: Json;
					amazon_url?: string | null;
					amazon_button_label?: string | null;
					brand_name?: string | null;
					seo_title?: string | null;
					seo_description?: string | null;
					seo_og_image_path?: string | null;
					created_at?: string;
					updated_at?: string;
					published_at?: string | null;
				};
				Update: {
					name?: string;
					slug?: string;
					tagline?: string | null;
					short_description?: string | null;
					description?: string | null;
					sku?: string | null;
					category_id?: string | null;
					status?: 'draft' | 'published' | 'archived';
					base_price?: number | null;
					sale_price?: number | null;
					currency?: string | null;
					badge?: string | null;
					is_featured?: boolean;
					is_new_arrival?: boolean;
					is_best_seller?: boolean;
					sort_order?: number;
					specs?: Json;
					details?: Json;
					highlights?: Json;
					amazon_url?: string | null;
					amazon_button_label?: string | null;
					brand_name?: string | null;
					seo_title?: string | null;
					seo_description?: string | null;
					seo_og_image_path?: string | null;
					updated_at?: string;
					published_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'products_category_id_fkey';
						columns: ['category_id'];
						isOneToOne: false;
						referencedRelation: 'categories';
						referencedColumns: ['id'];
					}
				];
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
				Relationships: [
					{
						foreignKeyName: 'product_images_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'products';
						referencedColumns: ['id'];
					}
				];
			};
			product_variants: {
				Row: {
					id: string;
					product_id: string;
					name: string;
					color_hex: string | null;
					image_url: string | null;
					price_adjustment: number | null;
					stock_quantity: number | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					product_id: string;
					name: string;
					color_hex?: string | null;
					image_url?: string | null;
					price_adjustment?: number | null;
					stock_quantity?: number | null;
					created_at?: string;
				};
				Update: {
					name?: string;
					color_hex?: string | null;
					image_url?: string | null;
					price_adjustment?: number | null;
					stock_quantity?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'product_variants_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'products';
						referencedColumns: ['id'];
					}
				];
			};
			site_content: {
				Row: {
					content_key: string;
					content_value: Json;
					description: string | null;
					is_published: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					content_key: string;
					content_value: Json;
					description?: string | null;
					is_published?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					content_value?: Json;
					description?: string | null;
					is_published?: boolean;
					updated_at?: string;
				};
				Relationships: [];
			};
			site_pages: {
				Row: {
					id: string;
					slug: string;
					title: string;
					content: string | null;
					excerpt: string | null;
					status: 'draft' | 'published' | 'archived' | string;
					seo_title: string | null;
					seo_description: string | null;
					og_image_path: string | null;
					sort_order: number;
					created_at: string;
					updated_at: string;
					published_at: string | null;
				};
				Insert: {
					id?: string;
					slug: string;
					title: string;
					content?: string | null;
					excerpt?: string | null;
					status?: string;
					seo_title?: string | null;
					seo_description?: string | null;
					og_image_path?: string | null;
					sort_order?: number;
					created_at?: string;
					updated_at?: string;
					published_at?: string | null;
				};
				Update: {
					slug?: string;
					title?: string;
					content?: string | null;
					excerpt?: string | null;
					status?: string;
					seo_title?: string | null;
					seo_description?: string | null;
					og_image_path?: string | null;
					sort_order?: number;
					updated_at?: string;
					published_at?: string | null;
				};
				Relationships: [];
			};
			site_media: {
				Row: {
					id: string;
					storage_path: string;
					alt_text: string | null;
					width: number | null;
					height: number | null;
					display_order: number;
					is_active: boolean;
					media_type: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					storage_path: string;
					alt_text?: string | null;
					width?: number | null;
					height?: number | null;
					display_order?: number;
					is_active?: boolean;
					media_type?: string | null;
					created_at?: string;
				};
				Update: {
					storage_path?: string;
					alt_text?: string | null;
					width?: number | null;
					height?: number | null;
					display_order?: number;
					is_active?: boolean;
					media_type?: string | null;
				};
				Relationships: [];
			};
			contact_messages: {
				Row: {
					id: string;
					name: string;
					email: string;
					subject: string | null;
					message: string;
					status: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					email: string;
					subject?: string | null;
					message: string;
					status?: string | null;
					created_at?: string;
				};
				Update: {
					status?: string | null;
				};
				Relationships: [];
			};
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
	};
}
