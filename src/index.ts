import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.html(`
    <h1>Client Fetch Example</h1>
    <button id="fetchData">Fetch Data</button>
    <pre id="output"></pre>

    <script>
        document.getElementById('fetchData').addEventListener('click', async () => {
            try {
                const response = await fetch('https://ebbc-2409-13-96a1-7500-3def-8e1e-e29e-6e78.ngrok-free.app/data', {
                    method: 'POST'
                });
                const data = await response.json();
                document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    </script>
  `);
});

const port = 3001
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
