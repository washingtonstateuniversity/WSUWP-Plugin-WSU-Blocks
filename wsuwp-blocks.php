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

	/**
	 * Add hooks on boot.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ), 10, 1 );
		add_action( 'admin_init', array( $this, 'remove_page_editor' ) );
		add_action( 'save_post', array( $this, 'save_content_blocks' ), 10, 2 );
		add_action( 'wp_head', array( $this, 'remove_content_filter' ), 99 );
	}

	/**
	 * Remove the wpautop filter added by WordPress when a WSU Block page is loaded
	 * and replace it with a filtering function of our own.
	 */
	public function remove_content_filter() {
		// @todo also check if this page supports blocks.
		if ( is_page() ) {
			remove_filter( 'the_content', 'wpautop', 10 );
			add_filter( 'the_content', array( $this, 'spineautop' ), 10 );
		}
	}

	/**
	 * Content created with WSU Blocks uses <section> elements that are described
	 * through HTML comments. This function augments the functionality provided
	 * by WordPress's wpautop.
	 *
	 * @param string $text Current `the_content` text being displayed.
	 *
	 * @return string Modified `the_content` text.
	 */
	public function spineautop( $text ) {
		$block_count = absint( get_post_meta( get_the_ID(), '_wsuwp_block_count', true ) );

		$final_html = '';

		for ( $i = 1; $i <= $block_count; $i++ ) {
			// Match the saved content for a specific section in the HTML comments. We look for the section
			// and then grab the specified classes and content.
			preg_match('/<!-- section-' . $i . '-class:([a-z-,_]+):type:([a-z]+): -->(.*?)<!-- end-section-' . $i . ' -->/s', $text, $matches);
			if ( isset( $matches[1] ) ) {
				// Classes are passed in the section comment as comma separated values.
				$classes = explode( ',', esc_attr( $matches[1] ) );
				$classes = implode( ' ', $classes );

				$type = $matches[2];

				// @todo explore reasoning and use of wp_unslash
				$section_html = '<section id="section-' . $i . '" class="' . $classes . '">';

				if ( 'single' === $type ) {
					$section_html .= '<div class="column one">' . wp_unslash( wpautop( $matches[3] ) ) . '</div>';
				} elseif ( in_array( $type, array( 'sidebar', 'sideleft' ) ) ) {
					$column_html_parts = explode( '<!-- column-split -->', $matches[3] );
					$section_html .= '<div class="column one">' . wp_unslash( wpautop( $column_html_parts[0] ) ) . '</div>';
					$section_html .= '<div class="column two">' . wp_unslash( wpautop( $column_html_parts[1] ) ) . '</div>';
				}

				$section_html .= '</section>';
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
		<div id="add-wsublock-single" class="wsublock-add">Add single section</div>
		<div id="add-wsublock-sidebar" class="wsublock-add">Add sidebar section</div>
		<div id="add-wsublock-sideleft" class="wsublock-add">Add sideleft section</div>
		<div class="clear"></div>
		<?php
	}

	public function display_current_content_blocks( $post ) {
		$block_count = absint( get_post_meta( $post->ID, '_wsuwp_block_count', true ) );

		?>
		<input type="hidden" id="wsublocks-count" name="wsublocks_count" value="<?php echo $block_count; ?>" />
		<div id="wsublock-wrapper">
		<?php
		for ( $i = 1; $i <= $block_count; $i++ ) {
			// Match the saved content for a specific section in the HTML comments. We look for the section
			// and then grab the specified classes and content.
			preg_match('/<!-- section-' . $i . '-class:([a-z-,_]+):type:([a-z]+): -->(.*?)<!-- end-section-' . $i . ' -->/s', $post->post_content, $matches);
			if ( isset( $matches[1] ) ) {
				// Classes are passed in the section comment as comma separated values.
				$classes = explode( ',', esc_attr( $matches[1] ) );
				$classes = implode( ' ', $classes );

				echo '<div id="wsublock-current-' . $i . '" class="wsublock-current-container">' . $matches[3] . '</div>';
				echo '<input type="hidden" name="wsublock-current-' . $i . '" value="' . $matches[3] . '" />';
			}
		}
		?>
		</div>
		<div id="wsublock-editor-hidden" class="hidden">
			<?php wp_editor( '', 'wsublock-hidden-temp' ); ?>
		</div>
		<?php
	}

	private function get_section_class( $section_type ) {
		if ( 'single' === $section_type ) {
			return 'row,single';
		} elseif ( 'sidebar' === $section_type ) {
			return 'row,sidebar';
		} elseif ( 'sideleft' === $section_type ) {
			return 'row,sideleft';
		}

		return 'row';
	}

	/**
	 * Process the section data added through WSU Blocks before saving the
	 * post content to the database.
	 *
	 * @param int     $post_id ID of the post being saved.
	 * @param WP_Post $post    Post object being saved.
	 */
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
			if ( isset( $_POST['wsublock-current-' . $i ] ) ) {
				if ( isset( $_POST['wsublock-type-' . $i ] ) ) {
					$classes = $this->get_section_class( $_POST['wsublock-type-' . $i ] );
				} else {
					$classes = 'row';
				}
				$data = $_POST['wsublock-current-' . $i ]; // save chunks

				$content .= '<!-- section-' . $i . '-class:' . $classes . ': -->' . $data . '<!-- end-section-' . $i . ' -->'; // save entire thing
				var_dump( $content );

			}
		}
		$post->post_content = $content;
		remove_action( 'save_post', array( $this, 'save_content_blocks' ), 10 );
		wp_update_post( $post );
		add_action( 'save_post', array( $this, 'save_content_blocks' ), 10, 2 );
		update_post_meta( $post_id, '_wsuwp_block_count', $i );
	}
}
new WSU_Blocks();