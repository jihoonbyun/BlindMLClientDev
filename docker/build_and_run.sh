#!/bin/bash

# 매개변수로 모듈 이름과 버전을 받음
MODULE_NAME=$1
MODULE_VERSION=$2

# Docker 이미지 빌드
docker build --build-arg MODULE_NAME=${MODULE_NAME} --build-arg VERSION=${MODULE_VERSION} -t my-${MODULE_NAME}-app ./docker

# Docker 컨테이너 실행
docker run -v "$(pwd)/Temp:/app/Temp" my-${MODULE_NAME}-app
