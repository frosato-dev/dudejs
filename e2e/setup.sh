CLIENT_DIR=/tmp/dudejs-client

# link dudejs as global node module
npm link

# clean old tmp directory
[ ! -d $CLIENT_DIR ] || rm -rf $CLIENT_DIR

mkdir $CLIENT_DIR
cd $CLIENT_DIR
mkdir src

npm init -y
npm link dudejs