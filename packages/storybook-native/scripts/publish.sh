# Start PR check

set -e

EXP_CHANNEL="${EXP_CHANNEL:-${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}}"

appJson() {
  node -e "console.log(require('./app.json').expo['$1'])"
}

handleError() {
  errorCode="${3:-1}"
  commit-status failure deploy/expo "Failed to publish expo project." $TRAVIS_JOB_WEB_URL
  exit $errorCode
}
handleExit() {
  expoUrl="https://exp.host/@${EXP_USERNAME}/$(appJson slug)?release-channel=${EXP_CHANNEL}"
  commit-status success deploy/expo "QR Code is ready." $expoUrl
}

if [[ "$CI" || "$CONTINUOUS_INTEGRATION" ]]; then
  trap hadleExit 0
  trap hadleError ERR
fi

tmpConfig=$PWD/.app.json.tmp

sed -E 's/(\"privacy\":) \"(.*)\"/\1 \"unlisted\"/' app.json > $tmpConfig
expo whoami || expo login -u $EXP_USERNAME -p $EXP_PASSWORD
expo publish --release-channel $EXP_CHANNEL --config $tmpConfig

rm -f $tmpConfig
