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
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ), 10, 1 );
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
		<?php
	}
}
new WSU_Blocks();