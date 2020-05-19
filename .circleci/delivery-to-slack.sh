#!/bin/bash
# $1 : Release Type
# $2 : Slack Channel
# $3 : Branch

### start of getting version
VERSION="$(jq -r '.version' ./package.json)"
if [ "$VERSION" == "0.0.0" ]
then
  VERSION="dev"
else
  VERSION="v$VERSION"
fi
echo "version : $VERSION"
### end of getting version

if [ "$1" == "PRD" ]; then
  URL="https://fomes.web.app"
else
  URL="https://fomes-web-dev.web.app"
fi

NEW_LINE=$'\n'

curl -F channel=$2 \
    -F text="[$1] 포메스 웹 페이지 $VERSION 버전이 릴리즈 되었습니다!${NEW_LINE}:point_right::skin-tone-2: <$URL|랜딩페이지 확인하러 가기>" \
    -F token=$SLACK_BOT_TOKEN \
    -F as_user=true \
    https://slack.com/api/chat.postMessage