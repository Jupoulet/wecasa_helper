import { Hono } from 'hono';
import { Form, FormUK } from './form';
import { getUniqueEmail, getUniquePhoneNumber, getUniqueSiren, initialStateFR, postAccount, initialStateUK } from './utils';

const app = new Hono()

app.get('/', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber();

  return c.html(
    <Form  {...initialStateFR} email={email} mobile={mobile} />
  )
})
.post('/', async (c) => {
  const bodyForm = await c.req.parseBody();
  const nova_status = bodyForm.company_status !== 'no_entity' ? 'yes' : '';
  const siren = bodyForm.company_status !== 'no_entity' ? await getUniqueSiren() : '';
  console.log('context', c.req.header().referer)
  const country = c.req.header().referer.split('/').find((code) => code === 'uk');
  const initialState =  country === 'uk' ? initialStateUK : initialStateFR
  const result = await postAccount({
    ...initialState,
    ...bodyForm,
    nova_status,
    siren: country === 'uk' ? '' : siren,
  });

  const parsedResponse = await result.json();

  return c.json(parsedResponse);
})

app.get('/uk', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber(true);

  return c.html(
    <FormUK  {...initialStateUK} email={email} mobile={mobile} />
  )
})

export default app
