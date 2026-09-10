#!/usr/bin/env bash
# Build the static site and publish it to Cloudflare Pages.
#
#   scripts/deploy-static.sh                 # deploy to the review project
#   SITE_LIVE=1 scripts/deploy-static.sh     # same build, but indexable
#
# Everything under out/ is disposable: the prune step below only touches build
# output, never the repository's own assets.
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT="${CF_PAGES_PROJECT:-aqua-mantra-redesign}"
# Two accounts are available to this wrangler login; be explicit about which.
export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-a74fc73b8e2049957ad79d6f94b545a2}"

rm -rf out
STATIC_EXPORT=1 npx next build

# Source assets that no page or stylesheet references. Shipping them would add
# roughly 18 MB to every deploy.
rm -f out/images/generated/*.png
rm -f out/images/current/install-*.jpg out/images/current/hero-existing-*.jpg
rm -f out/file.svg out/globe.svg out/window.svg

echo "Deploying $(du -sh out | cut -f1) to Cloudflare Pages project: $PROJECT"
npx wrangler pages deploy out --project-name "$PROJECT" --commit-dirty=true --branch main
