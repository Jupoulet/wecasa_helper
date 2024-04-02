import type { FC } from 'hono/jsx';

const initialState = {
    "device_source": "web",
    "universe": "cleaning",
    "mobile": "+33 7 89 78 89 87",
    "country_code": "FR",
    "salutation": "M.",
    "first_name": "julien",
    "last_name": "picard",
    "email": "juju@gmail.com",
    "password": "123456",
    "address": "12 Rue Des Marguettes, 75012, Paris",
    "street_name": "Rue Des Marguettes",
    "street_number": "12",
    "city": "Paris",
    "zip_code": "75012",
    "lat": 48.842989,
    "lng": 2.408055,
    "date_of_birth": "10/01/1993",
    "company_status": "no_company",
    "can_work_in_france": "yes_french_or_eu",
    "weekly_hours": "twenty_to_thirty",
    "also_a_nanny": false,
    "internet_promotion_authorisation": true,
    "declarative_source": "google",
    "is_revenue_simulator": true
}

type FormProps = typeof initialState

export const Form: FC<FormProps> = ({ email, mobile, first_name, last_name, country_code, salutation, ...rest }) => {
    return (
        <form action='/' method='post'>
            <div>
                <label>
                    FirstName
                    <input type='text' name='first_name' value={first_name} />
                </label>
            </div>
            <div>
                <label>
                    LastName
                    <input type='text' name='last_name' value={last_name} />
                </label>
            </div>
            <div>
                <label>
                    Email
                    <input type='text' name='email' value={email} />
                </label>
            </div>
            <div>
                <label>
                    Phone
                    <input type='text' name='mobile' value={mobile} />
                </label>
            </div>
            <div>
                <label>
                    CountryCode
                    <input type='text' name='country_code' value={country_code} />
                </label>
            </div>
            <div>
                Gender
                <label>
                    <input type='radio' name='salutation' value='M.' checked={salutation === 'M.'} />
                    Monsieur
                </label>
                <label>
                    <input type='radio' name='salutation' value='Mme' checked={salutation === 'Mme'} />
                    Madame
                </label>
            </div>
            <button type="submit">Valider</button>
        </form>
    )
}