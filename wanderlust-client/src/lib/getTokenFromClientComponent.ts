
import { authClient } from './auth-client';

const getTokenFromClientComponent = async () => {

    const { data } = await authClient.token();
    const token = data?.token;

    return token;
};

export default getTokenFromClientComponent;
