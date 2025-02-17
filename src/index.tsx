import { Hono } from 'hono';
import { Form, FormUK, FormDE } from './form';
import { getUniqueEmail, getUniquePhoneNumber, getUniqueSiren, initialStateFR, postAccount, initialStateUK, initialStateDE } from './utils';

const app = new Hono()

export type Country = 'FR' | 'DE' | 'GB';
const initialStateByCountry: Record<Country, any> = {
  FR: initialStateFR,
  GB: initialStateUK,
  DE: initialStateDE,
}

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
  const country = (c.req.header().referer.split('/').reverse()[0].toUpperCase() || 'FR') as Country;
  const siren = bodyForm.company_status !== 'no_entity' ? await getUniqueSiren(country) : '';
  const initialState =  initialStateByCountry[country]
  const result = await postAccount({
    ...initialState,
    ...bodyForm,
    nova_status,
    siren,
  });

  const parsedResponse = await result.json();

  return c.json(parsedResponse);
})

app.get('/gb', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber('GB');

  return c.html(
    <FormUK  {...initialStateUK} email={email} mobile={mobile} />
  )
})

app.get('/de', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber('DE');

  return c.html(
    <FormDE  {...initialStateDE} email={email} mobile={mobile} />
  )
})

export default app
