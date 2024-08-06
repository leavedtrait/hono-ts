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
bun run start
```
bun complies all javascript files and outputs a single binary with buns runtime

open http://localhost:3000

# Docker
TL:DR --sets up a postgress dev container and start a container for the app

# To build the docker services :
```sh
 docker compose build     
```

# To start the docker services:
this maps the containers port to your machine 
```sh
docker compose up -d    
```
open http://localhost:3000

# To stop the docker services run :
```sh
 docker compose down 
```
alternatively stop each service by running :
```sh
 docker stop  Hono-app
 docker stop  Hono-postgress-instance
```

