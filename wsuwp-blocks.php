<?php
/*
Plugin Name: WSU Blocks
Version: 0.0.1
Plugin URI: http://web.wsu.edu
Description: Manage blocks of content in WordPress.
Author: washingtonstateuniversity, jeremyfelt
Author URI: http://web.wsu.edu
*/

class WSU_Blocks {

	/**
	 * @var string Used to break cache on scripts and styles.
	 */
	var $script_version = '0.0.1';

	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ), 10, 1 );
		add_action( 'admin_init', array( $this, 'remove_page_editor' ) );
		add_action( 'save_post', array( $this, 'save_content_blocks' ), 10, 2 );
		add_action( 'wp_head', array( $this, 'remove_content_filter' ), 99 );
	}

	public function remove_content_filter() {
		// @todo also check if this page supports blocks.
		if ( is_page() ) {
			remove_filter( 'the_content', 'wpautop', 10 );
			add_filter( 'the_content', array( $this, 'spineautop' ), 10 );
		}
	}

	public function spineautop( $text ) {
		$block_count = absint( get_post_meta( get_the_ID(), '_wsuwp_block_count', true ) );

		$final_html = '';

		for ( $i = 1; $i <= $block_count; $i++ ) {
			// get sections and loop
			preg_match('/<!-- section-' . $i . '-class:([a-z-,_]+): -->(.*?)<!-- end-section-' . $i . ' -->/s', $text, $matches);
			if ( isset( $matches[1] ) ) {
				$classes = explode( ',', esc_attr( $matches[1] ) );
				$classes = implode( ' ', $classes );

				$section_html = '<section id="section-' . $i . '" class="' . $classes . '">' . wp_unslash( wpautop( $matches[2] ) ) . '</section>';
				$final_html .= $section_html;
			}
		}

		return $final_html;
	}

	/**
	 * Remove support for the default editor instance in pages.
	 */
	public function remove_page_editor() {
		remove_post_type_support('page', 'editor');
	}

	/**
	 * Enqueue the Javascript and stylesheet used to manage the admin interface
	 * for content blocks.
	 */
	public function admin_enqueue_scripts() {
		if ( 'post' === get_current_screen()->base && 'page' === get_current_screen()->post_type ) {
			wp_enqueue_script( 'wsublock-admin', plugins_url( '/js/wsublock-admin.js', __FILE__ ), array( 'jquery' ), $this->script_version, true );
			wp_enqueue_style( 'wsublock-admin', plugins_url( '/css/wsublock-admin.css', __FILE__ ), array(), $this->script_version );
		}
	}

	/**
	 * Add custom meta boxes to the edit post screen.
	 *
	 * @param string $post_type The post type of the current editor view.
	 */
	public function add_meta_boxes( $post_type ) {
		add_meta_box( 'wsublocks-add', 'Add Content Block', array( $this, 'display_add_content_block' ), 'page', 'normal', 'default' );
		add_meta_box( 'wsublocks-current', 'Page Content', array( $this, 'display_current_content_blocks' ), 'page', 'normal', 'default' );
	}

	/**
	 * Display a meta box with options for adding various block sizes to the page.
	 */
	public function display_add_content_block() {
		?>
		<div id="add-wsublock-single" class="wsublock-add">Add a single wide block</div>
		<div id="add-wsublock-double" class="wsublock-add">Add two even blocks</div>
		<div id="add-wsublock-triple" class="wsublock-add">Add three even blocks</div>
		<div class="clear"></div>
		<?php
	}

	public function display_current_content_blocks() {
		?>
		<input type="hidden" id="wsublocks-count" name="wsublocks_count" value="0" />
		<div id="wsublock-wrapper"></div>
		<div id="wsublock-editor-hidden" class="hidden">
			<?php wp_editor( '', 'wsublock-hidden-temp' ); ?>
		</div>
		<?php
	}

	public function save_content_blocks( $post_id, $post ) {
		if ( 'page' !== $post->post_type ) {
			return;
		}

		// We want at least one content block to exist before we start saving.
		if ( empty( $_POST['wsublocks_count'] ) ) {
			return;
		}

		$content = '';

		for ( $i = 1; $i <= absint( $_POST['wsublocks_count'] ); $i++ ) {
			$data = $_POST['wsublock-current-' . $i ]; // save chunks
			$content .= '<!-- section-' . $i . '-class:row,sidebar,gutter,wide: -->' . $data . '<!-- end-section-' . $i . ' -->'; // save entire thing
		}

		$post->post_content = $content;
		remove_action( 'save_post', array( $this, 'save_content_blocks' ), 10 );
		wp_update_post( $post );
		add_action( 'save_post', array( $this, 'save_content_blocks' ), 10, 2 );
		update_post_meta( $post_id, '_wsuwp_block_count', $i );
	}
}
new WSU_Blocks();