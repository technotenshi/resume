FROM node:24-bookworm

ARG NPM_VERSION=11.11.0

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  fonts-liberation \
  libcairo2 \
  libcups2 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libdbus-1-3 \
  libdrm2 \
  libfontconfig1 \
  libgbm1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxkbcommon0 \
  libxrandr2 \
  libxrender1 \
  libxshmfence1 \
  wget \
  xvfb \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@${NPM_VERSION} \
  && npm --version

WORKDIR /opt/app
