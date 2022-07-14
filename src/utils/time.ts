function currentTime(locale: string = 'pt-br'): string {
    return new Date(Date.now()).toLocaleTimeString(locale);
};

function currentDate(locale: string = 'pt-br'): string {
    return new Date(Date.now()).toLocaleDateString(locale);
};

function formatedTime(locale: string = 'pt-br'): string {
    return `${currentDate(locale)} ${currentTime(locale)}`;
};

function tokenExpiration(minutes: number): bigint {
    console.log(`Token expiration: ${minutes} minutes ${Date.now() + minutes * 60000}`);
    return BigInt(Date.now() + minutes * 60000);
};

const timeUtils = {
    currentTime,
    currentDate,
    formatedTime,
    tokenExpiration
};

export default timeUtils;