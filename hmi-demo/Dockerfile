ARG ROVER_IMAGE=roverflake2:gpu
FROM ${ROVER_IMAGE}
USER root
RUN apt-get update && apt-get install -y --no-install-recommends novnc websockify \
    && rm -rf /var/lib/apt/lists/*
COPY start.sh /usr/local/bin/start-hmi-demo
ENTRYPOINT ["bash", "/usr/local/bin/start-hmi-demo"]
