import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { setCookie, getCookie } from 'hono/cookie'
import { Form, FormUK, FormDE, FormAT, FormCH } from './form';
import { getUniqueEmail, getUniquePhoneNumber, getUniqueSiren, initialStateFR, initialStateAT, initialStateCH, postAccount, initialStateUK, initialStateDE, signin, closeAccount } from './utils';
import { Login } from './login';
import { CloseForm } from './close-form';

const app = new Hono()

export type Country = 'FR' | 'DE' | 'GB' | 'AT' | 'CH';
const initialStateByCountry: Record<Country, any> = {
  FR: initialStateFR,
  GB: initialStateUK,
  DE: initialStateDE,
  AT: initialStateAT,
  CH: initialStateCH,
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

app.get('/at', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber('AT');

  return c.html(
    <FormAT  {...initialStateAT} email={email} mobile={mobile} />
  )
})

app.get('/ch', async (c) => {
  const email = await getUniqueEmail();
  const mobile = await getUniquePhoneNumber('CH');

  return c.html(
    <FormCH  {...initialStateCH} email={email} mobile={mobile} />
  )
})

app.use('/protected/*', async (c, next) => {
  const token = getCookie(c, 'auth_token')

  if (!token) {
    return c.json({ error: 'Non autorisé' }, 401)
  }

  try {
    const user = await verify(token, 'SECRET_KEY')
    c.set('user', user) // Attache l'utilisateur au contexte
    await next()
  } catch (err) {
    return c.json({ error: 'Session expirée ou invalide' }, 401)
  }
})

app.get('/protected/close', async (c) => {
  const user = c.get('user');
  return c.html(
    <CloseForm user={user} />
  );
})
.post('/protected/close', async (c) => {
  const body = await c.req.parseBody();
  const user = c.get('user');
  const result = await closeAccount(body, user.authToken);
  if (result.status === 200) {
    return c.redirect('/');
  }
  return c.text('Nope');
})

app.get('/login', async (c) => {
  return c.html(
    <Login />
  )
})
.post('/login', async (c) => {
  const { email, password } = await c.req.parseBody();
  if (typeof email !== 'string' || typeof password !== 'string') return;

  const result = await signin({ email, password });
  if (result.status === 200) {
    const authToken = result.headers.get('authorization');
    const token = await sign({
        user: email,
        authToken,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24h
      },
      'SECRET_KEY',
    );
    setCookie(c, 'auth_token', token)
    return c.text(authToken as string);
  }

  const parsedResponse = await result.json();
  return c.json(parsedResponse);
})

export default app
