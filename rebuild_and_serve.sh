VERSION="sakul6499-$(git rev-parse --abbrev-ref HEAD)"
BUILD_VERSION="$VERSION-build"
echo "Version: $VERSION"

if [ "$VERSION" == "sakul6499-staging" ]; then
    PORT="8081:80"
else
    PORT="8080:80"
fi

docker build -f build.docker -t $BUILD_VERSION .
docker run -it --rm -v ${PWD}:/project $BUILD_VERSION bash -c "cd /project && yarn install && yarn build" 

docker build -f serve.docker -t $VERSION .
docker rm -f -v $VERSION
docker run -d --name $VERSION -p "$PORT" $VERSION
