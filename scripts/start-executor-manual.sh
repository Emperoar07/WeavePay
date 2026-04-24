#!/usr/bin/env bash
set -euo pipefail

export HOME=/home/bolaji
export USER=bolaji
export PATH=/usr/lib/go-1.22/bin:/home/bolaji/.local/bin:/home/bolaji/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/mnt/wsl/docker-desktop/cli-tools/usr/bin

OPINIT_HOME="${OPINIT_HOME:-$HOME/.opinit}"
OPINITD="$HOME/.weave/data/opinitd@v1.0.20/opinitd"

mkdir -p "$OPINIT_HOME"
nohup "$OPINITD" --home "$OPINIT_HOME" start executor > "$OPINIT_HOME/executor.log" 2>&1 &
sleep 3
cat "$OPINIT_HOME/executor.log"
