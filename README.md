# Hie

[![GitHub Actions Workflow Status:build](https://img.shields.io/github/actions/workflow/status/ziteh/hie/build.yml?style=flat-square&label=Build)](https://github.com/ziteh/hie/actions/workflows/build.yml)
[![GitHub Actions Workflow Status:docker-image](https://img.shields.io/github/actions/workflow/status/ziteh/hie/docker-image.yml?style=flat-square&label=Docker&logo=docker)](https://github.com/ziteh/hie/actions/workflows/docker-image.yml)
[![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)

![screenshot](https://i.imgur.com/5KAjjgz.png)

Hie - ***Hi***erarchical tag-based image ***E***xplorer.

Easily organize your images using a flexible, hierarchical tagging system, where tags can have nested sub-tags, and each image can be associated with multiple tags.

All tag data is centrally stored in a database, ensuring that the original folder structure of your files remains untouched.

Hie can run on a NAS via Docker, allowing you to access and view your images conveniently through web browser.

<details>
  <summary>About the sample images in screenshot</summary>
  <p>These beautiful images are from <a href="https://unsplash.com/">Unsplash</a>, their authors and sources are:</p>
  <ul>
    <li><a href="https://unsplash.com/photos/macro-shot-photography-of-pink-petals-flower-11U6h85yJ9U">Aaron Burden</a></li>
    <li><a href="https://unsplash.com/photos/shallow-focus-photography-of-white-flowers-urUdKCxsTUI">Anthony DELANOIX</a></li>
    <li><a href="https://unsplash.com/photos/selective-focus-photo-of-pink-petaled-flower-GNKlowAIYXY">Christiane Nuetzel</a></li>
    <li><a href="https://unsplash.com/photos/red-and-yellow-flower-digital-wallpaper-7m-Zigjxc8E">Luca</a></li>
    <li><a href="https://unsplash.com/photos/yellow-daffodil-flowers-in-bloom-in-spring-4l9qmFImnnI">Tim Gouw</a></li>
  </ul>
</details>

## Usage

### Develop

```sh
pnpm install
pnpm run prisma:migration
pnpm run dev
```

API docs at <http://localhost:3000/api/docs>, powered by [Swagger UI](https://github.com/swagger-api/swagger-ui).

### Docker

Refer to the [`Dockerfile`](./Dockerfile) and [`docker-compose.yml`](./docker-compose.yml) for more details.

```sh
# Build
docker build -t hie .

# Run and expose port 5888 on the host
docker run -d --name hie -p 5888:3000 -v <HIE_VOLUME_DIR>:/app/volume hie

# Save image
docker save -o hie.tar hie
```

`<HIE_VOLUME_DIR>` refer to the host directory where your images are stored. This will be mounted inside the Docker container at `/app/volume` to allow the app to access your images.
