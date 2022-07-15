import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config();

function encrypt(password: string): string {

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    return cryptr.encrypt(password);
};

function decrypt(password: string): string {

    const cryptr = new Cryptr(process.env.SECRET_KEY);
    return cryptr.decrypt(password);
};

const cryptrService = {
    encrypt,
    decrypt
};

export default cryptrService;