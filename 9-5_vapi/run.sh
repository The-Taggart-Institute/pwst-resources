#!/bin/bash

echo "[+] Cloning vAPI repo"
git clone https://github.com/roottusk/vAPI
cd vAPI
sed -i "s/80:80/8004:80/" docker-compose.yml
sed -i "s/8001:80/8005:80/" docker-compose.yml
docker compose up -d
