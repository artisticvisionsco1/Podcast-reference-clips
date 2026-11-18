#!/bin/bash
# Re-download the asset files listed in manifest.tsv (assets are not committed).
cd "$(dirname "$0")"
while IFS=$'\t' read -r path url note; do [ -f "$path" ] || curl -sSL --retry 3 -o "$path" "$url"; done < manifest.tsv
