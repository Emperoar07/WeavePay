#!/usr/bin/env bash
set -euo pipefail

export HOME=/home/bolaji
export USER=bolaji
export PATH=/usr/lib/go-1.22/bin:/home/bolaji/.local/bin:/home/bolaji/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/mnt/wsl/docker-desktop/cli-tools/usr/bin

mkdir -p "$HOME/.local/bin" "$HOME/.cache/weave-upgrade"
cd "$HOME/.cache/weave-upgrade"

version="$(curl -fsSL https://api.github.com/repos/initia-labs/weave/releases/latest | jq -r '.tag_name' | sed 's/^v//')"
echo "Latest Weave version: $version"

archive="weave-${version}-linux-amd64.tar.gz"
url="https://github.com/initia-labs/weave/releases/download/v${version}/${archive}"

wget -O "$archive" "$url"
tar -xvf "$archive"

if [[ -f "$HOME/.local/bin/weave" ]]; then
  cp "$HOME/.local/bin/weave" "$HOME/.local/bin/weave.backup.$(date +%Y%m%d%H%M%S)"
fi

install -m 755 weave "$HOME/.local/bin/weave"
"$HOME/.local/bin/weave" version
