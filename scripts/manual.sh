for package in packages/*; do
  cd "$package" && (npm publish || true) && cd ../../
done