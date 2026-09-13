# Native HMI in the portfolio

This runs Aaron’s existing ROS 2 / Qt HMI. Qt’s VNC platform exposes the application display; noVNC delivers it in the page and forwards mouse and keyboard input. It does not recreate the widgets.

## Local session

With Docker running and RoverFlake2 already built:

```sh
npm run hmi
```

Then open the Rover page and select **Connect local HMI**. The standalone viewer is at http://localhost:6080/vnc.html?autoconnect=true&resize=scale.

The launcher uses `~/Documents/rover/RoverFlake2` and the existing `roverflake2:gpu` image. Override with `HMI_WORKSPACE`, `HMI_ROVER_IMAGE`, or `HMI_PORT` if needed. A custom port also needs a matching `NEXT_PUBLIC_HMI_DEMO_URL`.

The container executes:

```sh
source /opt/ros/humble/setup.bash
source /RoverFlake2/install/setup.bash
ros2 run rover_hmi_core rover_hmi
```

It mounts the workspace read-only, passes no devices or host display, uses its own network namespace and ROS domain, and publishes the browser port only on loopback. There is no connection to the rover hardware. Telemetry remains empty unless a separate simulation is deliberately added. Layout changes are in-memory for this session.

## Public hosting

GitHub Pages cannot run ROS 2, Qt, or the WebSocket proxy. A public demo needs this container on a persistent Linux host with its ROS workspace and image. Put port 6080 behind an HTTPS reverse proxy with WebSocket support; keep VNC port 5900 private. Limit access or allocate separate containers per visitor: one container is one shared HMI session.

Set `NEXT_PUBLIC_HMI_DEMO_URL` to the hosted HTTPS noVNC viewer URL **before building** the portfolio (or set the GitHub Actions repository variable of the same name), for example `https://hmi.example.com/vnc.html?autoconnect=true&resize=scale`. The viewer must permit embedding by the portfolio origin. The portfolio then shows **Open HMI** and embeds that endpoint instead of the local session.

No public host or public endpoint has been configured by this change.
