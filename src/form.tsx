import type { FC } from 'hono/jsx';
import { COMPANY_STATUS, GB_RESIDENCE_STATUS, UNIVERSES, WILL_WORK_AS_SELF_EMPLOYED, initialStateFR, initialStateCH, initialStateAT, initialStateDE, initialStateUK } from './utils';
import { css, Style } from 'hono/css'
import { Layout } from './layout';

const inputBlock = css`
    margin-bottom: 1rem;
`;

type InputProps = {
    name: string;
    id: string;
    value?: string;
    label: string;
    placeholder?: string;
};

type SelectProps = {
    name: string;
    id: string;
    children: any;
    label: string;
}

type RadioProps = {
    id: string;
    name: string;
    value: string;
    label: string;
    checked?: boolean;
}

const Radio = ({ id, name, label, value, checked }: RadioProps) => {
    return (
        <div class="flex items-center gap-x-3">
            <input checked={checked} id={id} name={name} value={value} type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        </div>
    )
}

const Select = ({ name, id, label, children }: SelectProps) => {
    return (
        <div class="sm:col-span-4">
          <label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
          <div class="mt-2">
            <select
                id={id}
                name={name}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 px-2"
            >
              {children}
            </select>
          </div>
        </div>
    );
}

const Input = ({ name, id, value, label, placeholder }: InputProps) => {
    return (
        <div class="sm:col-span-4">
          <label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                    type="text"
                    name={name}
                    id={id}
                    class="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    value={value}
                />
            </div>
          </div>
        </div>
    )
}


type FormProps = typeof initialStateFR;

export const Form: FC<FormProps> = ({ email, mobile, first_name, last_name, country_code, salutation, company_status, universe, ...rest }) => {
    return (
        <Layout country='FR'>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Pro subscription</h1>
            <div class="items-baseline flex flex-col gap-1">
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/gb">🇬🇧 UK form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/ch">🇨🇭 CH form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/at">🇦🇹 AT form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/de">🇩🇪 DE form</a>
                </button>
            </div>
            <form action='/' method='post' class='flex flex-col gap-4'>
                <div>
                    <span class="block text-sm font-medium leading-6 text-gray-900">Gender</span>
                    <Radio name='salutation' id='M.' value='M.' checked={salutation === 'M.'} label='Monsieur' />
                    <Radio name='salutation' id='Mme' value='Mme' checked={salutation === 'Mme'} label='Madame' />
                </div>
                <Select name='universe' label='Universe' id='universe'>
                    {UNIVERSES
                        .filter((u) => u !== 'childcare')
                        .map((u) => (
                            <option selected={u === universe} key={u} value={u}>{u}</option>
                        ))
                    }
                </Select>
                <Input name='first_name' id='first_name' value={first_name} label='FirstName' />
                <Input name='last_name' id='last_name' value={last_name} label='LastName' />
                <Input name='email' id='email' value={email} label='Email' />
                <Input name='mobile' id='mobile' value={mobile} label='Phone' />
                <Select name='country_code' label='Country code' id='country_code'>
                    <option value='FR' selected={country_code === 'FR'}>FR</option>
                    <option value='GB' selected={country_code === 'GB'}>GB</option>
                    <option value='DE' selected={country_code === 'DE'}>DE</option>
                    <option value='AT' selected={country_code === 'AT'}>AT</option>
                    <option value='CH' selected={country_code === 'CH'}>CH</option>
                </Select>
                <Select name='company_status' label='Company status' id='company_status'>
                    {COMPANY_STATUS.map((status) => (
                        <option key={status} value={status} selected={status === company_status}>{status}</option>
                    ))}
                </Select>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    )
}

type FormUKProps = typeof initialStateUK;
export const FormUK: FC<FormUKProps> = ({ email, mobile, first_name, last_name, country_code, salutation, universe, will_work_as_self_employed, gb_residence_status, ...rest }) => {
    return (
        <Layout country='GB'>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Pro subscription</h1>
            <div class="items-baseline flex flex-col gap-1">
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/">🇫🇷 FR form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/ch">🇨🇭 CH form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/at">🇦🇹 AT form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/de">🇩🇪 DE form</a>
                </button>
            </div>
            <form action='/' method='post' class='flex flex-col gap-4'>
                <div>
                    <span class="block text-sm font-medium leading-6 text-gray-900">Gender</span>
                    <Radio name='salutation' id='M.' value='M.' checked={salutation === 'M.'} label='Monsieur' />
                    <Radio name='salutation' id='Mme' value='Mme' checked={salutation === 'Mme'} label='Madame' />
                </div>
                <Select name='universe' label='Universe' id='universe'>
                    {UNIVERSES
                        .filter((u) => u !== 'childcare')
                        .map((u) => (
                            <option selected={u === universe} key={u} value={u}>{u}</option>
                        ))
                    }
                </Select>
                <Input name='first_name' id='first_name' value={first_name} label='FirstName' />
                <Input name='last_name' id='last_name' value={last_name} label='LastName' />
                <Input name='email' id='email' value={email} label='Email' />
                <Input name='mobile' id='mobile' value={mobile} label='Phone' />
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    )
}


type FormPropsDE = typeof initialStateDE;
export const FormDE: FC<FormPropsDE> = ({ email, mobile, first_name, last_name, country_code, salutation, company_status, universe, ...rest }) => {
    return (
        <Layout country='DE'>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Pro subscription</h1>
            <div class="items-baseline flex flex-col gap-1">
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/gb">🇬🇧 UK form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/ch">🇨🇭 CH form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/at">🇦🇹 AT form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/">🇫🇷 FR form</a>
                </button>
            </div>
            <form action='/' method='post' class='flex flex-col gap-4'>
                <div>
                    <span class="block text-sm font-medium leading-6 text-gray-900">Gender</span>
                    <Radio name='salutation' id='M.' value='M.' checked={salutation === 'M.'} label='Monsieur' />
                    <Radio name='salutation' id='Mme' value='Mme' checked={salutation === 'Mme'} label='Madame' />
                </div>
                <Select name='universe' label='Universe' id='universe'>
                    {UNIVERSES
                        .filter((u) => u !== 'childcare')
                        .map((u) => (
                            <option selected={u === universe} key={u} value={u}>{u}</option>
                        ))
                    }
                </Select>
                <Input name='first_name' id='first_name' value={first_name} label='FirstName' />
                <Input name='last_name' id='last_name' value={last_name} label='LastName' />
                <Input name='email' id='email' value={email} label='Email' />
                <Input name='mobile' id='mobile' value={mobile} label='Phone' />
                <Select name='country_code' label='Country code' id='country_code'>
                    <option value='FR' selected={country_code === 'FR'}>FR</option>
                    <option value='GB' selected={country_code === 'GB'}>GB</option>
                    <option value='DE' selected={country_code === 'DE'}>DE</option>
                    <option value='AT' selected={country_code === 'AT'}>AT</option>
                    <option value='CH' selected={country_code === 'CH'}>CH</option>
                </Select>
                <Select name='company_status' label='Company status' id='company_status'>
                    {COMPANY_STATUS.map((status) => (
                        <option key={status} value={status} selected={status === company_status}>{status}</option>
                    ))}
                </Select>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    )
}

type FormPropsAT = typeof initialStateAT;
export const FormAT: FC<FormPropsAT> = ({ email, mobile, first_name, last_name, country_code, salutation, company_status, universe, ...rest }) => {
    return (
        <Layout country='AT'>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Pro subscription</h1>
            <div class="items-baseline flex flex-col gap-1">
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/gb">🇬🇧 UK form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/ch">🇨🇭 CH form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/de">🇩🇪 DE form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/">🇫🇷 FR form</a>
                </button>
            </div>
            <form action='/' method='post' class='flex flex-col gap-4'>
                <div>
                    <span class="block text-sm font-medium leading-6 text-gray-900">Gender</span>
                    <Radio name='salutation' id='M.' value='M.' checked={salutation === 'M.'} label='Monsieur' />
                    <Radio name='salutation' id='Mme' value='Mme' checked={salutation === 'Mme'} label='Madame' />
                </div>
                <Select name='universe' label='Universe' id='universe'>
                    {UNIVERSES
                        .filter((u) => u !== 'childcare')
                        .map((u) => (
                            <option selected={u === universe} key={u} value={u}>{u}</option>
                        ))
                    }
                </Select>
                <Input name='first_name' id='first_name' value={first_name} label='FirstName' />
                <Input name='last_name' id='last_name' value={last_name} label='LastName' />
                <Input name='email' id='email' value={email} label='Email' />
                <Input name='mobile' id='mobile' value={mobile} label='Phone' />
                <Select name='country_code' label='Country code' id='country_code'>
                    <option value='FR' selected={country_code === 'FR'}>FR</option>
                    <option value='GB' selected={country_code === 'GB'}>GB</option>
                    <option value='DE' selected={country_code === 'DE'}>DE</option>
                    <option value='AT' selected={country_code === 'AT'}>AT</option>
                    <option value='CH' selected={country_code === 'CH'}>CH</option>
                </Select>
                <Select name='company_status' label='Company status' id='company_status'>
                    {COMPANY_STATUS.map((status) => (
                        <option key={status} value={status} selected={status === company_status}>{status}</option>
                    ))}
                </Select>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    );
}

type FormPropsCH = typeof initialStateCH;
export const FormCH: FC<FormPropsCH> = ({ email, mobile, first_name, last_name, country_code, salutation, company_status, universe, ...rest }) => {
    return (
        <Layout country='CH'>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">Pro subscription</h1>
            <div class="items-baseline flex flex-col gap-1">
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/gb">🇬🇧 UK form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/de">🇩🇪 DE form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/at">🇦🇹 AT form</a>
                </button>
                <button>
                    <a class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white block" href="/">🇫🇷 FR form</a>
                </button>
            </div>
            <form action='/' method='post' class='flex flex-col gap-4'>
                <div>
                    <span class="block text-sm font-medium leading-6 text-gray-900">Gender</span>
                    <Radio name='salutation' id='M.' value='M.' checked={salutation === 'M.'} label='Monsieur' />
                    <Radio name='salutation' id='Mme' value='Mme' checked={salutation === 'Mme'} label='Madame' />
                </div>
                <Select name='universe' label='Universe' id='universe'>
                    {UNIVERSES
                        .filter((u) => u !== 'childcare')
                        .map((u) => (
                            <option selected={u === universe} key={u} value={u}>{u}</option>
                        ))
                    }
                </Select>
                <Input name='first_name' id='first_name' value={first_name} label='FirstName' />
                <Input name='last_name' id='last_name' value={last_name} label='LastName' />
                <Input name='email' id='email' value={email} label='Email' />
                <Input name='mobile' id='mobile' value={mobile} label='Phone' />
                <Select name='country_code' label='Country code' id='country_code'>
                    <option value='FR' selected={country_code === 'FR'}>FR</option>
                    <option value='GB' selected={country_code === 'GB'}>GB</option>
                    <option value='DE' selected={country_code === 'DE'}>DE</option>
                    <option value='AT' selected={country_code === 'AT'}>AT</option>
                    <option value='CH' selected={country_code === 'CH'}>CH</option>
                </Select>
                <Select name='company_status' label='Company status' id='company_status'>
                    {COMPANY_STATUS.map((status) => (
                        <option key={status} value={status} selected={status === company_status}>{status}</option>
                    ))}
                </Select>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-min">Valider</button>
            </form>
        </Layout>
    );
}