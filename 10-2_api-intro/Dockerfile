FROM denoland/deno:latest

# The port that your application listens to.
EXPOSE 8003

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY api/* .
RUN deno cache index.ts

CMD ["run", "--allow-net", "index.ts"]