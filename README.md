# Thunder Cat

Light-weight web server with simple authentication

## Getting Started

1. `yarn install`
2. `yarn run server`
3. Open browser to `http://localhost:3000`

## Overview

Thunder Cat is meant to serve static files available to the public or
admin static files which are protected by a login. You may use any
frontend framework you wish and build to the directories you wish.

There are two folders of concern:

- `src/public/*` These are public static files, available to everyone.
- `src/admin/*` These are admin only static files requiring a login to access.

## Notes

- Sessions are stored in memory (so this does not scale.)
- User accounts are stored in `src/storage.json`
