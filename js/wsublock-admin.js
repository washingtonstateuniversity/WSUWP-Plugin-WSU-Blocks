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
		$wsublock_wrapper = $('#wsublock-wrapper');
		updateBoxCount();

		if ( 'add-wsublock-single' === element_id ) {
			$wsublock_wrapper.append('<div id="wsublock-current-' + tiny_instance_count + '" class="wsublock-current-container"></div>');

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].selector = '#wsublock-current-' + tiny_instance_count;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ] );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="single">');
		} else if ( 'add-wsublock-sidebar' === element_id ) {
			$wsublock_wrapper.append('<div class="wsublock-sidebar-container">' +
				'<div id="wsublock-current-' + tiny_instance_count + '-a" class="wsublock-current-container-sidebar"></div>' +
				'<div id="wsublock-current-' + tiny_instance_count + '-b" class="wsublock-current-container-sidebar"></div>' +
				'<div class="clear"></div></div>');

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].selector = '#wsublock-current-' + tiny_instance_count + '-a';
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + '-a' );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ] );

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].selector = '#wsublock-current-' + tiny_instance_count + '-b';
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + '-b' );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ] );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="sidebar">');
		} else if ( 'add-wsublock-sideleft' === element_id ) {
			$wsublock_wrapper.append('<div class="wsublock-sideleft-container">' +
				'<div id="wsublock-current-' + tiny_instance_count + '-a" class="wsublock-current-container-sideleft"></div>' +
				'<div id="wsublock-current-' + tiny_instance_count + '-b" class="wsublock-current-container-sideleft"></div>' +
				'<div class="clear"></div></div>');

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].selector = '#wsublock-current-' + tiny_instance_count + '-a';
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + '-a' );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ] );

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].selector = '#wsublock-current-' + tiny_instance_count + '-b';
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + '-b' );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ] );

			$wsublock_wrapper.append('<input type="hidden" name="wsublock-type-' + tiny_instance_count + '" value="sideleft">');
		} else if ( 'add-wsublock-halves' === element_id ) {
			$wsublock_wrapper.append('<div class="wsublock-halves-container">' +
				'<div id="wsublock-current-' + tiny_instance_count + '-a" class="wsublock-current-container-halves"></div>' +
				'<div id="wsublock-current-' + tiny_instance_count + '-b" class="wsublock-current-container-halves"></div>' +
				'<div class="clear"></div></div>');

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].selector = '#wsublock-current-' + tiny_instance_count + '-a';
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + '-a' );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-a' ] );

			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].selector = '#wsublock-current-' + tiny_instance_count + '-b';
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count + '-b' );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count + '-b' ] );

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