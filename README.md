# Hie

[![GitHub Actions Workflow Status:build](https://img.shields.io/github/actions/workflow/status/ziteh/hie/build.yml?style=flat-square&label=Build)](https://github.com/ziteh/hie/actions/workflows/build.yml)
[![GitHub Actions Workflow Status:docker-image](https://img.shields.io/github/actions/workflow/status/ziteh/hie/docker-image.yml?style=flat-square&label=Docker&logo=docker)](https://github.com/ziteh/hie/actions/workflows/docker-image.yml)
[![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)

Hie - ***Hi***erarchical tag-based image ***E***xplorer.

## Usage

### Develop

```sh
pnpm install
pnpm run prisma:update
pnpm run dev
```

API docs at <http://localhost:3000/api/docs>, powered by [Swagger UI](https://github.com/swagger-api/swagger-ui).

### Docker

Check [`Dockerfile`](./Dockerfile) and [`docker-compose.yml`](./docker-compose.yml).

```sh
# Build
docker build -t hie .

# Run and expose port 5888 on the host
docker run -d --name hie -p 5888:3000 -v <HIE_VOLUME_DIR>:/app/volume hie

# Save image
docker save -o hie.tar hie
```
