#!/usr/bin/env bash

backend_image="$1"
backend_image_tag="$2";
if [ ! -n "$2" ]; then
    backend_image_tag="$1"
    backend_image=
fi

echo backend_image
echo frontend_image

# shellcheck disable=SC2236
if [ ! -n "$backend_image" ]; then
    # no support image path, build it auto
    docker build -t blog-server:"$backend_image_tag" .
else
    docker load -i $backend_image
fi

docker run --name blog-server -p 7001:7001 -v /home/hxl/blog/static:/home/Service/app/public:rw -d blog-server:"$backend_image_tag"
