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
}
new WSU_Blocks();