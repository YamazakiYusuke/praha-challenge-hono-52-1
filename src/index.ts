import { serve } from '@hono/node-server'
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

const app = new Hono();

app.get('/', (c) => {
  // ファーストパーティクッキーの設定
  if (getCookie(c, 'firstPartyCookie') == null) {
    setCookie(c, 'firstPartyCookie', 'value1', {
      httpOnly: true,
    });
  }

  // example.comからサードパーティークッキーを取得
  // TODO: change image path
  return c.html(`
    <h1>Welcome to hoge.com</h1>
    <img src="http://localhost:3000/image" alt="Advertisement Image">
  `);
});

const port = 3001
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
