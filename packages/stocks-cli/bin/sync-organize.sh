#!/usr/bin/env bash

pnpm run build
node dist/index.cjs sync:sectors -v
node dist/index.cjs sync:sub-sectors -v
node dist/index.cjs sync:segments -v
node dist/index.cjs sync:companies -v
node dist/index.cjs sync:tickets -v
node dist/index.cjs sync:income -v
