# To install dependencies:
```sh
bun install
```

# To run a dev server:
```sh
bun run dev
```

# To run a production build :
```sh
bun run build && ./app
```
bun complies all javascript files and outputs a single binary with buns runtime

open http://localhost:3000

# To build the docker image :
```sh
 docker build -t "hono-bun" .   
```

# To run the docker container:
this maps the containers port to your machine 
open http://localhost:3000
```sh
docker run -p 3000:3000 hono-bun   
```
# To stop the docker container run :
```sh
 docker ps   
```
This outpts info such as:
CONTAINER ID   IMAGE               COMMAND                  CREATED        STATUS        PORTS                    NAMES

copy the container id and run:
```sh
 docker kill <YOUR CONTAINER ID>   
```
alternatively 
```sh
 docker stop <YOUR CONTAINER ID>   
```


