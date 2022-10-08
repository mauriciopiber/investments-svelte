#!/usr/bin/env bash

pnpm run build
node dist/index.cjs sync:sectors
node dist/index.cjs sync:sub-sectors
node dist/index.cjs sync:segments
node dist/index.cjs sync:companies
node dist/index.cjs sync:tickets
node dist/index.cjs sync:income
