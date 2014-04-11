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
	 * Process a click on an add content block box.
	 *
	 * @param element_id string containing the clicked element.
	 */
	handleClick = function( element_id ) {
		if ( 'add-wsublock-single' === element_id ) {
			updateBoxCount();
			$('#wsublock-wrapper' ).append('<div id="wsublock-current-' + tiny_instance_count + '"></div>');
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].selector = '#wsublock-current-' + tiny_instance_count;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ] );
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