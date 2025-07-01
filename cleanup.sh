set -o nounset
set -o errexit

old_app_name="angular-starter"
new_app_name=$1

has_not_arg() {
  echo "No your-app-name supplied. Usage eg.:" &&
    echo &&
    echo "./cleanup.sh your-app-name" &&
    echo &&
    exit 1
}

has_arg() {
  echo "Finding and replacing strings from $old_app_name to $new_app_name..." &&
    find ./ -not -path "./node_modules/*" -type f -exec sed -i "s/$old_app_name/$new_app_name/g" {} + &&
    echo "Renaming index.html..." && sed -i "s/$old_app_name/$new_app_name/g" ./src/index.html &&
    echo "Renaming angular.json..." && sed -i "s/$old_app_name/$new_app_name/g" ./angular.json &&
    echo "Renaming README.md..." && sed -i "s/$old_app_name/$new_app_name/g" ./README.md &&
    echo "Renaming header..." && sed -i "s/$old_app_name/$new_app_name/g" ./src/app/core/components/header.component.ts &&
    echo "Removing git..." && rm -rf .git &&
    echo "Removing this cleanup script..." && rm ./cleanup.sh &&
    echo &&
    echo "Project successfully cleaned from $old_app_name to $new_app_name." &&
    echo &&
    exit 0
}

if [ "$#" -eq "0" ]; then
  has_not_arg
else
  has_arg
fi
