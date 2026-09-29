#!/usr/bin/env bash
# Smoke test: health, listado, subida multipart real via backend, reproducción y borrado.
set -euo pipefail
BASE="${BASE:-http://localhost:3102}"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
TOKEN="$(sed -n 's/^ADMIN_TOKEN=//p' "$DIR/.env")"
AUTH=(-H "Authorization: Bearer $TOKEN")
JSON=(-H 'content-type: application/json')

echo "health: $(curl -fsS "$BASE/admin/health")"

echo -n "objects: "
curl -fsS "${AUTH[@]}" "$BASE/admin/api/objects?prefix=" -o /tmp/smoke.objects.json
head -c 100 /tmp/smoke.objects.json; echo "..."

KEY="_smoke/$(date +%s).bin"
BIN=/tmp/smoke.bin
[ -f "$BIN" ] || head -c 6291456 /dev/urandom > "$BIN"

UPLOAD_ID="$(curl -fsS "${AUTH[@]}" "${JSON[@]}" \
  -d "{\"key\":\"$KEY\",\"contentType\":\"application/octet-stream\"}" \
  "$BASE/admin/api/upload/init" | sed -n 's/.*"uploadId":"\([^"]*\)".*/\1/p')"
[ -n "$UPLOAD_ID" ] || { echo "FAIL: sin uploadId"; exit 1; }

ETAG="$(curl -fsS -X PUT --data-binary @"$BIN" \
  "${AUTH[@]}" \
  -H 'content-type: application/octet-stream' \
  "$BASE/admin/api/upload/part?key=$KEY&uploadId=$UPLOAD_ID&partNumber=1" \
  | sed -n 's/.*"etag":"\([^"]*\)".*/\1/p')"
[ -n "$ETAG" ] || { echo "FAIL: sin ETag"; exit 1; }
echo "part subido via backend, etag=$ETAG"

curl -fsS "${AUTH[@]}" "${JSON[@]}" \
  -d "{\"key\":\"$KEY\",\"uploadId\":\"$UPLOAD_ID\",\"parts\":[{\"PartNumber\":1,\"ETag\":\"$ETAG\"}]}" \
  "$BASE/admin/api/upload/complete"; echo

PLAY_URL="$(curl -fsS "${AUTH[@]}" "$BASE/admin/api/play?key=$KEY" \
  | sed -n 's/.*"url":"\([^"]*\)".*/\1/p')"
curl -fsS -o /dev/null -w "play http %{http_code} size %{size_download}\n" "$PLAY_URL"

curl -fsS "${AUTH[@]}" -X DELETE "$BASE/admin/api/object?key=$KEY"; echo
echo "OK: smoke completo"
