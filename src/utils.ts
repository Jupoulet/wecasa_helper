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

type ValidateUniqueBody = {
    email?: string;
    phone?: string;
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

export const getUniquePhoneNumber = async () => {
    let uniqueNumber;
  
    while (!uniqueNumber) {
      const phoneNumber = generateFrenchPhoneNumber();
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

export const railsInitialState = {
    "authenticity_token": "b0mdyHpfoX4Vniy0L3xEMsWN5-fDSZLeVqkF6hIP7jEZkfEGdEnQFr2OURWUQL_ZLdY5tiMQQPQXf2wtZLXHGA",
    "universe": "beauty",
    "pro_subscription": {
      "universes": ["beauty"],
      "salutation": "M.",
      "first_name": "Julien",
      "last_name": "Picard",
      "date_of_birth": "10/01/1993",
      "siren": "415245345",
      "email": "beautytest@gmail.com",
      "address": "12 Rue Des Marguettes, 75012, Paris",
      "street_number": "12",
      "street_name": "Rue Des Marguettes",
      "zip_code": "75012",
      "city": "Paris",
      "lat": "48.842989",
      "lng": "2.408055",
      "country_code": "FR",
      "phone": "+33 6 89 87 87 89",
      "pro_subscription": {
        "phone": "+33689878789"
      },
      "password": "123456",
      "company_status": "no_company",
      "declarative_source": "facebook",
      "cgu_accepted": true,
      "variant": "a",
      "internet_promotion_authorisation": [0, 1]
    },
  }
  


export const initialState = {
    "is_multistep": true,
    "device_source": "web",
    "universe": "cleaning",
    "mobile": "",
    "country_code": "FR",
    "salutation": "M.",
    "first_name": "julien",
    "last_name": "picard",
    "email": "",
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
    "is_revenue_simulator": false
  };

export const postAccount = async (body: typeof initialState) => {
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