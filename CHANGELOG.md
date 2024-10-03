# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:

- **Added** for new features.
- **Changed** for changes in existing functionality.
- **Deprecated** for soon-to-be removed features.
- **Removed** for now removed features.
- **Fixed** for any bug fixes.
- **Security** in case of vulnerabilities.

## Unreleased

### Changed

- Updated the API of items/{id}, items/relation, tags/relation
- Updated the layout of explorer showcase
- Move "New Tag/Item/Folder" button from database page to sidebar

### Security

- Bump Next.js from `14.2.6` to `14.2.10`, refer to `CVE-2024-46982`

## [0.1.0-alpha.2] - 2024-09-17

### Added

- Add tag ID to explorer route
- Add breadcrumbs to explorer page
- Add children tag button to explorer page
- Add `/api/tags/root` API for fetch root tags
- Add `DEFAULT_IMG_QUALITY` env variable for `/api/image` API to control default image quality

### Changed

- Switched to client-side routing instead of using `href`

## [0.1.0-alpha.1] - 2024-09-15

First release.

[0.1.0-alpha.2]: https://github.com/ziteh/hie/releases/tag/v0.1.0-alpha.2
[0.1.0-alpha.1]: https://github.com/ziteh/hie/releases/tag/v0.1.0-alpha.1
