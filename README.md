# Conduit

Conduit is dynamic social media platform

## Installation

Clone the project

```bash
  git clone https://github.com/nguyen-duc-loc/conduit.git
```

Open a new window in your terminal, change directory to `socket`, create a new `.env.local` file and add the following environment variable to that file

`SOCKET_PORT`

Then, install dependencies

```bash
  npm install
```

Back to the first window in your terminal, create a new `.env.local` file and add the following environment variables

`BACKEND_URL=https://node-express-conduit.appspot.com`

`BASE_URL`

`SOCKET_HOST`

**Note:**

- `BASE_URL` is the url of your website, if your run locally, assign it to `http://localhost:3000`.
- `SOCKET_HOST` will be equal to `localhost:{SOCKET_PORT}` (`SOCKET_PORT` is the value you assigned in `socket/.env.local` file).

After that, install dependencies

```bash
  npm install
```

If you want run the development server, run the following command

```bash
  npm run dev
```

Or, if your want to run the production server, you need generate an optimized version of your application for production.

```bash
  npm run build
```

Once that's done, start your server

```bash
  npm run start
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
