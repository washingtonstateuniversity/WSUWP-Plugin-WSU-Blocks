(function($ ){

	/**
	 * Contains the default settings for a new tinyMCE instance.
	 */
	var tiny_instance_defaults;

	/**
	 * Contains the current count of tinyMCE boxes displayed on
	 * the screen.
	 *
	 * @type {number}
	 */
	var tiny_instance_count = 0;

	/**
	 * Update the tinyMCE instance count in memory and in the DOM
	 */
	updateBoxCount = function() {
		tiny_instance_count++;
		$('#wsublocks-count').val( tiny_instance_count );
	};

	/**
	 * Display a tinyMCE editor instance. When requested, label the instance with
	 * a segment.
	 *
	 * @param segment A segment to display. Should be '', '-a', or '-b'
	 */
	displayBlock = function( segment ) {
		window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + segment ] = tiny_instance_defaults;
		window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + segment ].selector = '#wsublock-current-' + tiny_instance_count + segment;
		window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + segment ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + segment ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + segment );
		window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + segment ] );
	};

	/**
	 * Process a click on an add content block box.
	 *
	 * @param element_id string containing the clicked element.
	 */
	handleClick = function( element_id ) {
		$wsublock_wrapper = $('#wsublock-wrapper');
		updateBoxCount();

		if ( 'add-wsublock-single' === element_id ) {
			$wsublock_wrapper.append('<div id="wsublock-current-' + tiny_instance_count + '" class="wsublock-current-container"></div>');

			displayBlock( '' );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="single">');
		} else if ( 'add-wsublock-sidebar' === element_id ) {
			$wsublock_wrapper.append('<div class="wsublock-sidebar-container">' +
				'<div id="wsublock-current-' + tiny_instance_count + '-a" class="wsublock-current-container-sidebar"></div>' +
				'<div id="wsublock-current-' + tiny_instance_count + '-b" class="wsublock-current-container-sidebar"></div>' +
				'<div class="clear"></div></div>');

			displayBlock( '-a' );
			displayBlock( '-b' );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="sidebar">');
		} else if ( 'add-wsublock-sideleft' === element_id ) {
			$wsublock_wrapper.append('<div class="wsublock-sideleft-container">' +
				'<div id="wsublock-current-' + tiny_instance_count + '-a" class="wsublock-current-container-sideleft"></div>' +
				'<div id="wsublock-current-' + tiny_instance_count + '-b" class="wsublock-current-container-sideleft"></div>' +
				'<div class="clear"></div></div>');

			displayBlock( '-a' );
			displayBlock( '-b' );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="sideleft">');
		} else if ( 'add-wsublock-halves' === element_id ) {
			$wsublock_wrapper.append('<div class="wsublock-halves-container">' +
				'<div id="wsublock-current-' + tiny_instance_count + '-a" class="wsublock-current-container-halves"></div>' +
				'<div id="wsublock-current-' + tiny_instance_count + '-b" class="wsublock-current-container-halves"></div>' +
				'<div class="clear"></div></div>');

			displayBlock( '-a' );
			displayBlock( '-b' );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="havles">');
		}
	};

	// We can immediately attach a click event, as this exists in the DOM already.
	$( '#wsublocks-add' ).on( 'click', '.wsublock-add', function() { handleClick( this.id ) } );

	$(document ).ready( function(){
		// Capture the defaults from a hidden tinyMCE instance for reuse.
		tiny_instance_defaults = window.tinyMCEPreInit.mceInit['wsublock-hidden-temp'];
		tiny_instance_count = $('#wsublocks-count' ).val();
	})
}(jQuery));