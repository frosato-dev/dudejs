CLIENT_DIR=/tmp/dudejs-client
DUDEJS_DIR=${PWD}

# Build & package dudejs locally
npm run build
PKG=$DUDEJS_DIR/$(npm pack . | tail -1)

# Clean old tmp directory
[ ! -d $CLIENT_DIR ] || rm -rf $CLIENT_DIR

# Init client dir and it's src folder
mkdir $CLIENT_DIR $CLIENT_DIR/src
cd $CLIENT_DIR

# Init git
git init

# Init node project
npm init -y
npm i $PKG