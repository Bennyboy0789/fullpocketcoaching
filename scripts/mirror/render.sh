#!/bin/bash
# Runs on the server. Renders WordPress URLs by executing index.php with the same php-cgi
# and php.ini the web server uses, without making any HTTP request. Read-only for content.
#
# Usage: render.sh <out_dir> < paths.txt     (one root-relative path per line, e.g. /about/)
# Output: <out_dir>/<n>.raw (CGI headers + body) and <out_dir>/index.tsv (n<TAB>path)
set -u
OUT="$1"
mkdir -p "$OUT"
ROOT="$HOME/public_html"
PHPCGI=/opt/cpanel/ea-php83/root/usr/bin/php-cgi
PREPEND="$(dirname "$0")/render-prepend.php"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"

n=$(wc -l < "$OUT/index.tsv" 2>/dev/null || echo 0)
while IFS= read -r path; do
	[ -z "$path" ] && continue
	n=$((n + 1))
	qs=""
	case "$path" in *\?*) qs="${path#*\?}" ;; esac
	(
		cd "$ROOT" && env -i PATH=/usr/bin:/bin REDIRECT_STATUS=200 GATEWAY_INTERFACE=CGI/1.1 \
			SERVER_PROTOCOL=HTTP/1.1 SERVER_SOFTWARE=Apache REQUEST_METHOD=GET HTTPS=on SERVER_PORT=443 \
			SERVER_NAME=fullpocketcoaching.com HTTP_HOST=fullpocketcoaching.com REQUEST_URI="$path" \
			SCRIPT_NAME=/index.php PHP_SELF=/index.php SCRIPT_FILENAME="$ROOT/index.php" DOCUMENT_ROOT="$ROOT" \
			QUERY_STRING="$qs" HTTP_ACCEPT="text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
			HTTP_ACCEPT_LANGUAGE=en-US REMOTE_ADDR=127.0.0.1 HTTP_USER_AGENT="$UA" \
			"$PHPCGI" -d auto_prepend_file="$PREPEND"
	) > "$OUT/$n.raw" 2>> "$OUT/stderr.log"
	printf '%s\t%s\n' "$n" "$path" >> "$OUT/index.tsv"
done
