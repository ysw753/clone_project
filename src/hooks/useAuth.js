import {useContext} from 'react';
import AuthContext from '../api/context/AuthProvider';

const useAuth = () => {
    return useContext(AuthContext);
}
 
export default useAuth;
