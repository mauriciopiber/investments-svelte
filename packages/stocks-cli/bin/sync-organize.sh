#!/usr/bin/env bash

pnpm run build
node dist/index.cjs sync:sectors
node dist/index.cjs sync:sub-sectors
node dist/index.cjs sync:segments
node dist/index.cjs sync:companies
# node dist/index.cjs sync:tickets  || echo "Errors in tickets"
# node dist/index.cjs sync:income || echo "Errors in income"
