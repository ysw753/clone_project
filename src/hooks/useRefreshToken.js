import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh', { withCredentials: true });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.result.accessToken);
            return {...prev, accessToken: response.data.result.accessToken};
        });
        return response.data.result.accessToken;
    }

    return refresh;
}

export default useRefreshToken;