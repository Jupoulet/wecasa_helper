import { Hono } from 'hono';
import { Form } from './form';
import { getUniqueEmail, getUniquePhoneNumber, initialState, postAccount } from './utils';

const app = new Hono()

app.get('/', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber();

  return c.html(<Form  {...initialState} email={email} mobile={mobile} />)
})
.post('/', async (c) => {
  const bodyForm = await c.req.parseBody();

  const result = await postAccount({
    ...initialState,
    ...bodyForm,
  });

  const parsedResponse = await result.json();

  return c.json(parsedResponse);
})

export default app
