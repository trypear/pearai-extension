#!/bin/bash

# Use find to handle both files and directories in the current directory
find . -depth -name "*Rubberduck*" ! -path "." | while read item; do
    # Extract the base new name by replacing "Rubberduck" with "PearAI"
    base_new_name=$(basename "$item" | sed 's/Rubberduck/PearAI/g')
    # Construct new path by replacing the last occurrence of the old name
    new_path=$(dirname "$item")/"$base_new_name"
    # Rename the item
    mv "$item" "$new_path"
    echo "Renamed $item to $new_path"
done