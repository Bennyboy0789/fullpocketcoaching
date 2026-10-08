<?php
/**
 * Read-only export of fullpocketcoaching.com content for the Next.js rebuild.
 *
 * Run on the server:  wp eval-file wp-export.php > export.json
 * It only reads. It exports published pages and posts, Elementor data and templates, the
 * Elementor kit, menus, Forminator form definitions, media metadata, Rank Math SEO fields,
 * and a short allowlist of site options. No users, credentials, or other plugin settings.
 */

$elementor = class_exists( '\Elementor\Plugin' ) ? \Elementor\Plugin::$instance : null;

$rank_math_keys = [
	'rank_math_title', 'rank_math_description', 'rank_math_focus_keyword', 'rank_math_robots',
	'rank_math_canonical_url', 'rank_math_facebook_title', 'rank_math_facebook_description',
	'rank_math_facebook_image', 'rank_math_twitter_title', 'rank_math_twitter_description',
	'rank_math_rich_snippet', 'rank_math_schema_Article', 'rank_math_schema_WebPage',
];

function fpc_json_meta( $id, $key ) {
	$raw = get_post_meta( $id, $key, true );
	if ( '' === $raw || null === $raw ) {
		return null;
	}
	if ( is_string( $raw ) ) {
		$decoded = json_decode( $raw, true );
		return null === $decoded ? $raw : $decoded;
	}
	return $raw;
}

function fpc_elementor_html( $elementor, $id ) {
	if ( ! $elementor || 'builder' !== get_post_meta( $id, '_elementor_edit_mode', true ) ) {
		return null;
	}
	try {
		return $elementor->frontend->get_builder_content_for_display( $id, false );
	} catch ( \Throwable $e ) {
		return 'RENDER_ERROR: ' . $e->getMessage();
	}
}

function fpc_entry( $post, $elementor, $rank_math_keys ) {
	$id   = $post->ID;
	$seo  = [];
	foreach ( $rank_math_keys as $key ) {
		$value = get_post_meta( $id, $key, true );
		if ( '' !== $value && null !== $value ) {
			$seo[ $key ] = $value;
		}
	}
	$is_builder = 'builder' === get_post_meta( $id, '_elementor_edit_mode', true );
	setup_postdata( $GLOBALS['post'] = $post );
	$entry = [
		'id'                 => $id,
		'type'               => $post->post_type,
		'status'             => $post->post_status,
		'slug'               => $post->post_name,
		'title'              => get_the_title( $id ),
		'url'                => get_permalink( $id ),
		'parent'             => $post->post_parent,
		'menu_order'         => $post->menu_order,
		'date'               => $post->post_date,
		'modified'           => $post->post_modified,
		'template'           => get_page_template_slug( $id ),
		'excerpt'            => $post->post_excerpt,
		'featured_image'     => get_the_post_thumbnail_url( $id, 'full' ) ?: null,
		'post_content'       => $post->post_content,
		'rendered_content'   => $is_builder ? null : apply_filters( 'the_content', $post->post_content ),
		'elementor'          => $is_builder ? [
			'data'          => fpc_json_meta( $id, '_elementor_data' ),
			'page_settings' => fpc_json_meta( $id, '_elementor_page_settings' ),
			'template_type' => get_post_meta( $id, '_elementor_template_type', true ),
			'conditions'    => get_post_meta( $id, '_elementor_conditions', true ),
			'html'          => fpc_elementor_html( $elementor, $id ),
		] : null,
		'seo'                => $seo,
	];
	if ( 'post' === $post->post_type ) {
		$entry['categories'] = wp_get_post_terms( $id, 'category', [ 'fields' => 'names' ] );
		$entry['tags']       = wp_get_post_terms( $id, 'post_tag', [ 'fields' => 'names' ] );
		$entry['author']     = get_the_author_meta( 'display_name', $post->post_author );
	}
	wp_reset_postdata();
	return $entry;
}

$export = [
	'exported_at' => gmdate( 'c' ),
	'site'        => [
		'home'                 => home_url( '/' ),
		'name'                 => get_option( 'blogname' ),
		'description'          => get_option( 'blogdescription' ),
		'site_icon'            => get_site_icon_url( 512 ),
		'show_on_front'        => get_option( 'show_on_front' ),
		'page_on_front'        => (int) get_option( 'page_on_front' ),
		'page_for_posts'       => (int) get_option( 'page_for_posts' ),
		'permalink_structure'  => get_option( 'permalink_structure' ),
		'date_format'          => get_option( 'date_format' ),
		'wp_version'           => get_bloginfo( 'version' ),
		'elementor_version'    => defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : null,
		'active_kit'           => (int) get_option( 'elementor_active_kit' ),
		'rank_math_titles'     => get_option( 'rank-math-options-titles' ),
		// Front-end snippets from Insert Headers and Footers (analytics, pixels). Public by nature.
		'scripts'              => [
			'header' => get_option( 'ihaf_insert_header' ),
			'body'   => get_option( 'ihaf_insert_body' ),
			'footer' => get_option( 'ihaf_insert_footer' ),
		],
	],
	'pages'       => [],
	'posts'       => [],
	'templates'   => [],
	'menus'       => [],
	'forms'       => [],
	'media'       => [],
];

foreach ( get_posts( [ 'post_type' => 'page', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'ID', 'order' => 'ASC' ] ) as $p ) {
	$export['pages'][] = fpc_entry( $p, $elementor, $rank_math_keys );
}
foreach ( get_posts( [ 'post_type' => 'post', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'date', 'order' => 'DESC' ] ) as $p ) {
	$export['posts'][] = fpc_entry( $p, $elementor, $rank_math_keys );
}
foreach ( get_posts( [ 'post_type' => 'elementor_library', 'post_status' => 'publish', 'numberposts' => -1 ] ) as $p ) {
	$export['templates'][] = fpc_entry( $p, $elementor, $rank_math_keys );
}

foreach ( wp_get_nav_menus() as $menu ) {
	$items = [];
	foreach ( wp_get_nav_menu_items( $menu->term_id ) ?: [] as $item ) {
		$items[] = [
			'id'        => $item->ID,
			'parent'    => (int) $item->menu_item_parent,
			'order'     => $item->menu_order,
			'title'     => $item->title,
			'url'       => $item->url,
			'object'    => $item->object,
			'object_id' => (int) $item->object_id,
			'target'    => $item->target,
			'classes'   => array_values( array_filter( (array) $item->classes ) ),
		];
	}
	$export['menus'][] = [ 'id' => $menu->term_id, 'name' => $menu->name, 'slug' => $menu->slug, 'items' => $items ];
}

foreach ( get_posts( [ 'post_type' => 'forminator_forms', 'post_status' => 'publish', 'numberposts' => -1 ] ) as $p ) {
	$export['forms'][] = [
		'id'    => $p->ID,
		'title' => $p->post_title,
		'meta'  => get_post_meta( $p->ID, 'forminator_form_meta', true ),
	];
}

foreach ( get_posts( [ 'post_type' => 'attachment', 'post_status' => 'inherit', 'numberposts' => -1 ] ) as $a ) {
	$meta = wp_get_attachment_metadata( $a->ID );
	$export['media'][] = [
		'id'     => $a->ID,
		'url'    => wp_get_attachment_url( $a->ID ),
		'mime'   => $a->post_mime_type,
		'title'  => $a->post_title,
		'alt'    => get_post_meta( $a->ID, '_wp_attachment_image_alt', true ),
		'width'  => $meta['width'] ?? null,
		'height' => $meta['height'] ?? null,
		'sizes'  => isset( $meta['sizes'] ) ? array_map( fn( $s ) => [ 'file' => $s['file'], 'width' => $s['width'], 'height' => $s['height'] ], $meta['sizes'] ) : [],
	];
}

echo wp_json_encode( $export, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
