CLIENT_DIR=/tmp/dudejs-client

# build & package dudejs locally
npm run build
PKG=$(pwd)/$(npm pack . | tail -1)

# clean old tmp directory
[ ! -d $CLIENT_DIR ] || rm -rf $CLIENT_DIR

mkdir $CLIENT_DIR
cd $CLIENT_DIR
mkdir src

npm init -y
npm i $PKG