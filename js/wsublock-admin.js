(function($ ){

	var tiny_instance_defaults;

	var tiny_instance_count = 1;

	handleClick = function( element_id ) {
		if ( 'add-wsublock-single' === element_id ) {
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ] = tiny_instance_defaults;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].selector = '#wsublock-current-' + tiny_instance_count;
			window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].body_class = window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ].body_class.replace( 'wsublock-hidden-temp', 'wsublock-current-' + tiny_instance_count );
			window.tinymce.init( window.tinyMCEPreInit.mceInit['wsublock-current-' + tiny_instance_count ] );
			tiny_instance_count++;
		}
	};

	$( '#wsublocks-add' ).on( 'click', '.wsublock-add', function() { handleClick( this.id ) } );

	$(document ).ready( function(){
		// Capture the defaults from a hidden tinyMCE instance for reuse.
		tiny_instance_defaults = window.tinyMCEPreInit.mceInit['wsublock-hidden-temp'];
	})
}(jQuery));