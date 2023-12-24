#!/bin/bash

# 현재 스크립트의 디렉토리 경로를 가져옵니다.
SCRIPT_DIR=$(dirname "$0")

# Docker 이미지 빌드 및 실행을 위한 build_and_run.sh 스크립트 호출
bash $SCRIPT_DIR/../../docker/build_and_run.sh zama v1
