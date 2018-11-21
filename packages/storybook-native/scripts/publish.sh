#!/usr/bin/env bash

set -eE

PATH="$PATH:$PWD/node_modules"
export GH_STATUS_TOKEN="${GITHUB_TOKEN:-$GH_TOKEN}"

appJson() { node -e "console.log(require('./app.json').expo['$1'])"; }
cleanup() { rm -f $tmpConfig; }
handleError() { commit-status failure deploy/expo "Failed to publish expo project." $TRAVIS_JOB_WEB_URL; }
handleExit() {
  expoUrl="https://exp.host/@${EXP_USERNAME}/$(appJson slug)?release-channel=${EXP_CHANNEL}"
  commit-status success deploy/expo "Expo QR Code is ready." $expoUrl
}

if [ "$GIT_STATUS" == "true" ]; then
  trap 'exitCode=$?; cleanup; [ "$exitCode" == "0" ] && handleExit || handleError;' EXIT
else
  trap 'cleanup;' EXIT
fi

tmpConfig=$PWD/.app.json.tmp
publishArgs=(--config $tmpConfig)
if [ "$EXP_CHANNEL" ]; then publishArgs+=(--release-channel $EXP_CHANNEL); fi
sed -E "s/(\\\"privacy\\\":) \\\"(.*)\\\"/\1 \\\"${EXP_PRIVACY:-public}\\\"/" app.json > $tmpConfig
expo whoami || expo login -u $EXP_USERNAME -p $EXP_PASSWORD
expo publish ${publishArgs[@]}
