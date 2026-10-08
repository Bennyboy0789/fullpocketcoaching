<?php
// Loaded only for mirror renders (php-cgi -d auto_prepend_file). Stops the Facebook pixel
// plugin from reporting our renders as page views through its Conversions API (it sends via
// its own SDK, so the plugin's filter is the reliable switch). WordPress picks up hooks
// pre-registered in $wp_filter when it boots.
$GLOBALS['wp_filter']['before_conversions_api_event_sent'][PHP_INT_MAX][] = [
	'function'      => static fn() => [],
	'accepted_args' => 1,
];
