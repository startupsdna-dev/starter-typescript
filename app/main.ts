import { createServer } from 'node:http';
import { name } from '~/app/lib/name';

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello, ${name()}!`);
});

server.listen(3000, () => {
  console.log('Server is listening port 3000');
});
