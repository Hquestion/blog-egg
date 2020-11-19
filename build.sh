#!/usr/bin/env bash
echo "您正在部署blog-egg项目..."
backend_image_path=
backend_image_tag=
echo "需要在线构建镜像吗？如果不需要，请输入镜像位置，否则直接回车："
while true; do
    read -r backend_image_path
    echo "image path: $backend_image_path"
    if [[ ! $backend_image_path || $backend_image_path == 'n' || $backend_image_path == 'no' || $backend_image_path == 'N' || $backend_image_path == 'NO' ]]; then
        break;
    elif [ -e $backend_image_path ]; then
        echo "镜像文件不存在，请重新输入："
    else
        break;
    fi
done

echo "输入镜像tag："
read -r backend_image_tag
echo "image tag: $backend_image_tag"

# shellcheck disable=SC2236
if [ ! -n "$backend_image_path" ]; then
    # no support image path, build it auto
    docker build -t blog-server:"$backend_image_tag" .
else
    docker load -i "$backend_image_path"
fi

docker run --name blog-server -p 7001:7001 -v /home/hxl/blog/static:/home/Service/app/public:rw -d blog-server:"$backend_image_tag"
