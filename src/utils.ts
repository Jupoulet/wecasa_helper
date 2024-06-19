export const UNIVERSES = ['cleaning', 'beauty', 'massage', 'haircut', 'childcare', 'sports_coaching'];
export const COMPANY_STATUS = ['no_company', 'auto_entrepreneur', 'other_entity']
export const WILL_WORK_AS_SELF_EMPLOYED = ['yes', 'no', 'dont_know'];
export const GB_RESIDENCE_STATUS = [
  'asylum-seeker',
  'british',
  'dependent_spouse-visa',
  'pre-settled_limited',
  'refugee',
  'settled_indefinite',
  'sponsored-visa',
  'student',
];

export type GbResidenceStatus =
  | 'asylum-seeker'
  | 'british'
  | 'dependent_spouse-visa'
  | 'pre-settled_limited'
  | 'refugee'
  | 'settled_indefinite'
  | 'sponsored-visa'
  | 'student';



function generateRandomEmail() {
    const usernameLength = 6;
    let username = '';
  
    // Generate random username
    for (let i = 0; i < usernameLength; i++) {
      const randomChar = Math.random() < 0.5 ? getRandomLetter() : getRandomDigit();
      username += randomChar;
    }
  
    // Construct the email
    const email = `${username}@gmail.com`;
  
    return email;
  }
  
  function getRandomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }
  
  function getRandomDigit() {
    const digit = Math.floor(Math.random() * 10);
    return digit.toString();
  }

  function generateRandomSIREN() {
    // Generate 8 random digits
    let sirenWithoutControlDigit = '';
    for (let i = 0; i < 8; i++) {
      sirenWithoutControlDigit += Math.floor(Math.random() * 10);
    }
  
    // Calculate the control digit
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      let digit = parseInt(sirenWithoutControlDigit[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    let controlDigit = (10 - (sum % 10)) % 10;
  
    // Concatenate all digits to form the SIREN number
    return sirenWithoutControlDigit + controlDigit;
  }
  
  function generateFrenchPhoneNumber() {
    const countryCode = Math.random() < 0.5 ? '+33 6 ' : '+33 7 ';
    const areaCode = Math.floor(Math.random() * 90) + 10; // Ensures a two-digit number
    const firstBlock = Math.floor(Math.random() * 100); // Ensures a two-digit number
    const secondBlock = Math.floor(Math.random() * 100); // Ensures a two-digit number
    const thirdBlock = Math.floor(Math.random() * 100); // Ensures a two-digit number
  
    const phone = [areaCode, firstBlock, secondBlock, thirdBlock].map((block) => {
      if (block < 10) return `0${block}`;
      return `${block}`;
    }).join(' ');
  
    // Format the phone number
    const phoneNumber = `${countryCode}${phone}`;
  
    return phoneNumber;
  }

  function generateUKPhoneNumber() {
    const countryCode = "+44";
    const areaCode = "7400";
    const secondBlock = Math.floor(Math.random() * 1000000); // Ensures a six-digit number

    const phone = secondBlock.toString().padStart(6, '0');

    // Format the phone number
    const phoneNumber = `${countryCode} ${areaCode} ${phone}`;

    return phoneNumber;
}

type ValidateUniqueBody = {
    email?: string;
    phone?: string;
  }

  export const postValidateSiren = async (siren: string) => {
    return fetch('https://staging.wecasa.fr/api/v1/pro/account/validate_siren', {
        method: 'POST',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        body: JSON.stringify({ siren })
      });
  }
  
  export const postValidateUnique = async ({ email, phone }: ValidateUniqueBody) => {
    return fetch('https://staging.wecasa.fr/api/v1/pro/account/validate_unique', {
        method: 'POST',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        body: JSON.stringify({ email, phone })
      });
  }

export const getUniqueSiren = async () => {
  let uniqueSiren;
  while (!uniqueSiren) {
    const siren = generateRandomSIREN();
    const result = await postValidateSiren(siren)
    if (result.status === 200) {
      uniqueSiren = siren;
    }
  }
  return uniqueSiren;
}

export const getUniquePhoneNumber = async (isUk = false) => {
    let uniqueNumber;
  
    while (!uniqueNumber) {
      const phoneNumber = isUk ? generateUKPhoneNumber() : generateFrenchPhoneNumber();
      const result = await postValidateUnique({ phone: phoneNumber })
      if (result.status === 200) {
        uniqueNumber = phoneNumber;
      }
    }
    return uniqueNumber;
  }
  
export const getUniqueEmail = async () => {
    let uniqueEmail;
    while (!uniqueEmail) {
        const email = generateRandomEmail();
        const result = await postValidateUnique({ email })
        if (result.status === 200) {
            uniqueEmail = email;
        }
    }
    return uniqueEmail;
}

export const initialStateUK = {
  "device_source": "web",
  "is_multi_step": true,
  "universe": "cleaning",
  "mobile": "+44 7400 182716",
  "country_code": "GB",
  "salutation": "M.",
  "first_name": "jean",
  "last_name": "jean",
  "email": "jean@gmail.com",
  "password": "Azerty1!",
  "address": "The King Of Flafel, 17 Hunter Street, London, WC1N 1BN",
  "street_name": "Hunter Street",
  "street_number": "17",
  "city": "London",
  "zip_code": "WC1N 1BN",
  "lat": 51.5260819,
  "lng": -0.1234869,
  "date_of_birth": "10/01/1993",
  "will_work_as_self_employed": "yes",
  "gb_residence_status": "british",
  "weekly_hours": "more_than_thirty",
  "internet_promotion_authorisation": true,
  "declarative_source": "google",
  "is_revenue_simulator": true
}

export const initialStateFR = {
    "is_multistep": true,
    "device_source": "web",
    "universe": "cleaning",
    "mobile": "",
    "country_code": "FR",
    "salutation": "M.",
    "first_name": "julien",
    "last_name": "picard",
    "email": "",
    "password": "Azerty1!",
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
    "is_revenue_simulator": false,
    "siren": "",
    "nova_status": "",
  };

export const postAccount = async (body: typeof initialStateFR | typeof initialStateUK) => {
    return fetch('https://staging.wecasa.fr/api/v1/pro/account', {
        method: 'POST',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        },
        body: JSON.stringify(body),
    });
}