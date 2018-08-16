for package in packages/*; do
  cd "$package" && npm publish || echo "publish failed for $package" && cd ../../
done