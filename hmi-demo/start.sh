#!/usr/bin/env bash
set -eo pipefail
source /opt/ros/humble/setup.bash
source /RoverFlake2/install/setup.bash
export QT_QPA_PLATFORM="vnc:size=1280x800:port=5900"
export ROS_DOMAIN_ID=199
export ROS_LOCALHOST_ONLY=1
export ROVERFLAKE_ROOT=/RoverFlake2

ros2 run rover_hmi_core rover_hmi &
hmi_pid=$!
websockify --web=/usr/share/novnc 6080 localhost:5900 &
proxy_pid=$!
trap 'kill "$hmi_pid" "$proxy_pid" 2>/dev/null || true' EXIT
trap 'exit 0' INT TERM
wait -n "$hmi_pid" "$proxy_pid"
