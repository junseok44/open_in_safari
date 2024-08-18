#!/bin/bash

# Define the host name
HOST_NAME=com.junseok.openinsafari

# Create the directory for NativeMessagingHosts if it doesn't exist
mkdir -p ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts

# Copy the JSON manifest to the appropriate directory
cp $HOST_NAME.json ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/

# Make the script executable
# chmod +x open_in_safari_script.sh
