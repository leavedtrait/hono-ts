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
 docker-compose build     
```

# To run the docker container:
this maps the containers port to your machine 
```sh
docker compose up -d    
```
open http://localhost:3000
# To stop the docker container run :
```sh
 docker compose down 
```
alternatively 
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


