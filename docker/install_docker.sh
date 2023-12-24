#!/bin/bash

# Check the operating system
OS="$(uname -s)"

case "${OS}" in
    Linux*)     
        # Check if Docker is installed on Linux
        if ! [ -x "$(command -v docker)" ]; then
            echo "Installing Docker..."
            sudo apt-get update
            sudo apt-get install -y docker-ce docker-ce-cli containerd.io
        else
            echo "Docker is already installed."
        fi

        # Start Docker service
        sudo systemctl start docker
        ;;
    Darwin*)
        # For macOS
        echo "Please manually install Docker Desktop on macOS."
        ;;
    CYGWIN*|MINGW32*|MSYS*|MINGW*)
        # For Windows
        echo "Please manually install Docker Desktop on Windows."
        ;;
    *)
        echo "Unknown operating system. Please manually proceed with Docker installation."
        ;;
esac