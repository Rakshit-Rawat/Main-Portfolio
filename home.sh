#!/bin/bash

# Set the target directory
TARGET_DIR="src/components/Home"

# Create the directory structure
mkdir -p "$TARGET_DIR"

# List of component files
FILES=(
  "Header.tsx"
  "Bio.tsx"
  "SocialIcons.tsx"
  "Tabs.tsx"
  "ProjectsSection.tsx"
  "SkillsSection.tsx"
  "ProjectCard.tsx"
)

# Create each file
for FILE in "${FILES[@]}"; do
  touch "$TARGET_DIR/$FILE"
done

echo "✅ Created Home components in $TARGET_DIR"
