VERSION="sakul6499-$(git branch --show-current)"
echo "Version: $VERSION"

if [ "$VERSION" == "sakul6499-staging" ]; then
    PORT="8081:80"
else
    PORT="8080:80"
fi

yarn install
yarn build

docker build -f serve.docker -t $VERSION .
docker rm -f -v $VERSION
docker run -d --name $VERSION -p "$PORT" $VERSION