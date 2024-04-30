import clipboard from 'clipboardy';
import { input } from '@inquirer/prompts';
import checkbox, { Separator } from '@inquirer/checkbox';
import select from '@inquirer/select';
import {
    getUniqueEmail,
    postValidateUnique,
    initialStateFR,
    postAccount,
    getUniquePhoneNumber,
    getUniqueSiren,
    UNIVERSES,
    COMPANY_STATUS,
} from './utils';

const askUniverse = async () => {
    return select({
        message: 'Choose your universe',
        choices: UNIVERSES.map((universe) => ({
            name: universe,
            value: universe
        }))
    });
}

const askCompanyStatus = async () => {
    return select({
        message: '',
        choices: COMPANY_STATUS.map((status) => ({
            name: status,
            value: status,
        })),
    });
}

const askForEmail = async () => {
    return input({ message: 'Enter an email' });
}

const askIsCustom = async () => {
    return select({
        message: '🤔 Do you want a custom account?',
        choices: [
            {
                name: 'no',
                value: false,
                description: 'I will generate the account with the default values'
            },
            {
                name: 'yes',
                value: true,
                description: 'You will be able to chose some inputs value yourself'
            }
        ]
    });
}

const askCustomInputs = async () => {
    return checkbox({
        message: '⬇️ Select what inputs you want to fill yourself',
        choices: [
            {
                name: 'universe',
                value: 'universe',
            },
            {
                name: 'company_status',
                value: 'company_status',
            },
            {
                name: 'email',
                value: 'email',
            },
            new Separator(),
            {
                name: 'none',
                value: 'none',
            },

        ]
    })
}

const generateEmail = async () => {
    let counter = 0;
    while (true) {
        if (counter > 0) {
            console.log('❌ Email is already taken')
        }
        const prompt = await askForEmail();
        counter++;
        const result = await postValidateUnique({ email: prompt })
        if (result.status === 200) {
            console.log('✅ Email validated')
            return prompt
        }
    }


}

const generateAccount = async (body: typeof initialStateFR) => {
    console.log('Creatin account...', body)
    const result = await postAccount(body);
    if (result.ok) {
        clipboard.writeSync(body.email);
        console.log(await result.json());
        console.log('🎉 Account has been created successfuly');
        console.log('✅ Email has been copied to your clipboard');
        console.log('🔑 Your password is 123456');
        return;
    }
    console.log('❌ Something went wrong', await result.json());
}

const main = async () => {
    const email = await getUniqueEmail();
    const mobile = await getUniquePhoneNumber();
    let body = { ...initialStateFR, email, mobile };
    console.log('Hi 👋 I will help you create your pro account')
    const isCustom = await askIsCustom();
    if (!isCustom) {
        await generateAccount(body);
        return;
    }
    const inputs = await askCustomInputs();

    if (inputs.some((input) => input === 'none')) return generateAccount(body);
    if (inputs.some((input) => input === 'company_status')) {
        const status = await askCompanyStatus();
        body.company_status = status;
        if (status !== 'no_company') body.nova_status = 'yes';
    };
    if (inputs.some((input) => input === 'email')) {
        body.email = await generateEmail(); 
    }
    if (inputs.some((input) => input === 'universe')) {
        const universe = await askUniverse();
        body.universe = universe;
        body.siren = await getUniqueSiren();
    }
    generateAccount(body);
};

main();





