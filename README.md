# Project Name

> Project description

## Related Projects

1. https://github.com/opentabs/sidebar
1. https://github.com/opentabs/menu
1. https://github.com/opentabs/reviews
1. https://github.com/opentabs/reservation-calendar
1. https://github.com/opentabs/photos-carousel

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```
npm install -g webpack
npm install
```

### CRUD API

The booking module has the following functions:

1. Create - Add an image
POST - /api/restaurants/:id/photos

2. Read - Retrieve all requested images
GET - /api/restaurants/:id/photos

3. Update - Modify image
PATCH - /api/restaurants/:id/photos

4.  Delete - Delete image
DELETE - /api/restaurants/:id/photos