#!/usr/bin/env bash
set -euo pipefail
workspace="${HMI_WORKSPACE:-$HOME/Documents/rover/RoverFlake2}"
image="${HMI_ROVER_IMAGE:-roverflake2:gpu}"
port="${HMI_PORT:-6080}"
if [[ ! -f "$workspace/install/setup.bash" ]]; then
  echo "Build RoverFlake2 first; missing $workspace/install/setup.bash" >&2
  exit 1
fi
docker build --build-arg "ROVER_IMAGE=$image" -t portfolio-hmi-demo hmi-demo
echo "HMI session: http://localhost:$port/vnc.html?autoconnect=true&resize=scale"
docker run --rm --init --name portfolio-hmi-demo \
  --mount "type=bind,src=$workspace,dst=/RoverFlake2,readonly" \
  --publish "127.0.0.1:$port:6080" \
  --workdir /RoverFlake2 portfolio-hmi-demo
