#!/bin/bash

# Find all files in the current directory and its subdirectories
find . -type f -name '*continue*' | while read -r file; do
  # Generate the new filename by replacing "continue" with "pearai"
  newfile=$(echo "$file" | sed 's/continue/pearai/g')
  # Rename the file
  mv "$file" "$newfile"
done