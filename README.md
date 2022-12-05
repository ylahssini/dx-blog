# DX-Blog
DX-Blog is small Wordpress like that i want badly to create it by myself. I want to experience the backend technologies like MongoDB, Nodejs and Docker. The project use Playwright which is reliable end-to-end testing to test the DX-Blog.

## Requirements
To launch the DX-Blog, we recommend to install Docker because it include all technologies that DX-Blog needs without install it individually.
To install Docker, please visit their website: [https://www.docker.com/](https://www.docker.com/)

## Building containers of DX-Blog
To launch the project, there is a development and production mode. Every mode has own commands to execute it.
If you want to use development mode, open the project folder in your terminal then execute these commands:

### Development mode
First of all, we need to build image and execute this is the command:
```Copy
docker compose build
```

Then, we create containers of this image in background:
```Copy
docker compose up -d
```

To see the DX-Blog in development mode, you need to open your browser and enter the url:
```Copy
http://localhost:9000/
```

### Production mode
Same thing, open the project folder in terminal and use these commands:

Build the Docker image if it doesn't built before:
```Copy
docker compose build
```

Then, execute this command to create the production container in background:
```Copy
docker compose -f docker-compose.override.yml up -d
```

To see the DX-Blog in production mode, you need to open your browser and enter the url:
```Copy
http://localhost:9090/
```
