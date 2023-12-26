import subprocess
import os

def check_and_pull_concrete_ml():
    try:
        # 'docker images' 명령어를 사용하여 설치된 이미지 확인
        installed_images = subprocess.check_output(['docker', 'images', 'zamafhe/concrete-ml', '--format', '{{.Repository}}:{{.Tag}}']).decode().strip()
        if 'zamafhe/concrete-ml:latest' not in installed_images:
            print("Installing Concrete ML Docker image...")
            subprocess.check_call(['docker', 'pull', 'zamafhe/concrete-ml:latest'])
        else:
            print("Concrete ML Docker image already installed.")
    except subprocess.CalledProcessError:
        # Docker가 설치되어 있지 않은 경우 오류 처리
        print("Docker is not installed or not running.")

def compile_and_run():
    # Concrete ML Docker 이미지 확인 및 필요 시 설치
    check_and_pull_concrete_ml()

    # Docker 컨테이너 실행 및 코드 복사
    container_id = subprocess.check_output(
        ['docker', 'run', '-d', 'zamafhe/concrete-ml:latest', 'tail', '-f', '/dev/null']
    ).decode().strip()
    subprocess.check_call(['docker', 'cp', 'converted_code.py', f'{container_id}:/app/converted_code.py'])

    # Docker 컨테이너 내에서 코드 실행
    subprocess.check_call(['docker', 'exec', container_id, 'python', '/app/converted_code.py'])

    # 실행 결과 파일들을 로컬 시스템에 복사
    subprocess.check_call(['docker', 'cp', f'{container_id}:/app/results', '.'])

    # Docker 컨테이너 정리
    subprocess.check_call(['docker', 'stop', container_id])
    subprocess.check_call(['docker', 'rm', container_id])

if __name__ == "__main__":
    compile_and_run()
