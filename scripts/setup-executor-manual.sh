#!/usr/bin/env bash
set -euo pipefail

export HOME=/home/bolaji
export USER=bolaji
export PATH=/usr/lib/go-1.22/bin:/home/bolaji/.local/bin:/home/bolaji/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/mnt/wsl/docker-desktop/cli-tools/usr/bin

OPINIT_HOME="${OPINIT_HOME:-$HOME/.opinit}"
CONFIG_JSON="$HOME/.minitia/artifacts/config.json"
ARTIFACTS_JSON="$HOME/.minitia/artifacts/artifacts.json"
OPINITD="$HOME/.weave/data/opinitd@v1.0.20/opinitd"
GENERATED_KEYFILE="$HOME/.weave/data/weave.opinit.generated.executor.keyfile"

mkdir -p "$OPINIT_HOME"

bridge_mnemonic="$(jq -r '.system_keys.bridge_executor.mnemonic' "$CONFIG_JSON")"
output_mnemonic="$(jq -r '.system_keys.output_submitter.mnemonic' "$CONFIG_JSON")"
batch_mnemonic="$(jq -r '.system_keys.batch_submitter.mnemonic' "$CONFIG_JSON")"
oracle_mnemonic="$bridge_mnemonic"

if [[ -f "$GENERATED_KEYFILE" ]]; then
  oracle_from_file="$(jq -r '.weave_oracle_bridge_executor.mnemonic // empty' "$GENERATED_KEYFILE")"
  if [[ -n "$oracle_from_file" ]]; then
    oracle_mnemonic="$oracle_from_file"
  fi
fi

l1_chain_id="$(jq -r '.l1_config.chain_id' "$CONFIG_JSON")"
l1_rpc="$(jq -r '.l1_config.rpc_url' "$CONFIG_JSON")"
l1_gas_price="$(jq -r '.l1_config.gas_prices' "$CONFIG_JSON")"

l2_chain_id="$(jq -r '.l2_config.chain_id' "$CONFIG_JSON")"
l2_gas_denom="$(jq -r '.l2_config.denom' "$CONFIG_JSON")"

l1_start_height="$(jq -r '.EXECUTOR_L1_MONITOR_HEIGHT | tonumber' "$ARTIFACTS_JSON")"
l2_start_height="$(jq -r '.EXECUTOR_L2_MONITOR_HEIGHT | tonumber' "$ARTIFACTS_JSON")"

cat > "$OPINIT_HOME/executor.json" <<EOF
{
  "version": 1,
  "server": {
    "address": "localhost:3000",
    "allow_origins": "*",
    "allow_headers": "Origin, Content-Type, Accept",
    "allow_methods": "GET"
  },
  "l1_node": {
    "chain_id": "$l1_chain_id",
    "bech32_prefix": "init",
    "rpc_address": "$l1_rpc",
    "gas_price": "$l1_gas_price",
    "gas_adjustment": 1.5,
    "tx_timeout": 60
  },
  "l2_node": {
    "chain_id": "$l2_chain_id",
    "bech32_prefix": "init",
    "rpc_address": "tcp://127.0.0.1:26657",
    "gas_price": "0$l2_gas_denom",
    "gas_adjustment": 1.5,
    "tx_timeout": 60
  },
  "da_node": {
    "chain_id": "$l1_chain_id",
    "bech32_prefix": "init",
    "rpc_address": "$l1_rpc",
    "gas_price": "$l1_gas_price",
    "gas_adjustment": 1.5,
    "tx_timeout": 60
  },
  "bridge_executor": "bridge_executor",
  "oracle_bridge_executor": "oracle_bridge_executor",
  "disable_output_submitter": false,
  "disable_batch_submitter": false,
  "max_chunks": 5000,
  "max_chunk_size": 300000,
  "max_submission_time": 3600,
  "disable_auto_set_l1_height": true,
  "l1_start_height": $l1_start_height,
  "l2_start_height": $l2_start_height,
  "batch_start_height": $l2_start_height,
  "disable_delete_future_withdrawal": false
}
EOF

add_key() {
  local chain_id="$1"
  local key_name="$2"
  local mnemonic="$3"
  if "$OPINITD" --home "$OPINIT_HOME" keys show "$chain_id" "$key_name" >/dev/null 2>&1; then
    echo "Key already present: $chain_id / $key_name"
    return
  fi

  "$OPINITD" --home "$OPINIT_HOME" keys add "$chain_id" "$key_name" \
    --recover \
    --mnemonic "$mnemonic" \
    --output json >/dev/null
  echo "Imported key: $chain_id / $key_name"
}

add_key "$l1_chain_id" "output_submitter" "$output_mnemonic"
add_key "$l1_chain_id" "batch_submitter" "$batch_mnemonic"
add_key "$l1_chain_id" "bridge_executor" "$bridge_mnemonic"
add_key "$l2_chain_id" "bridge_executor" "$bridge_mnemonic"
add_key "$l2_chain_id" "oracle_bridge_executor" "$oracle_mnemonic"

echo "Wrote $OPINIT_HOME/executor.json"
sed -n '1,200p' "$OPINIT_HOME/executor.json"
