# Hie

Hie - ***Hi***erarchical tag-based image ***E***xplorer.

## Usage

### Develop

```sh
pnpm install
pnpm run dev
```

API docs at <http://localhost:3000/api/docs>, powered by [Swagger UI](https://github.com/swagger-api/swagger-ui).

### Docker

Check [`Dockerfile`](./Dockerfile).

```sh
# Build
docker build -t hie .

# Run and expose port 5888 on the host
docker run -d --name hie -p 5888:3000 -v <HOST_DIR>:/app/data hie

# Save image
docker save -o hie.tar hie
```
