import axios from '../api/axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

const useAxios = () => {
    const dispatch = useDispatch();
    const access_token = useSelector(state => state.user.token);

    useEffect(() => {
        const reqInterseptor = axios.interceptors.request.use(
            request => {
                if (!request.headers['authorization']) {
                    request.headers['authorization'] = `Bearer ${access_token}`;
                }

                return request;
            },
            error => {
                return Promise.reject(error);
            }
        );
        
        const resInterseptor = axios.interceptors.response.use(
            response => {
                return response;
            },
            async error => {
                const prev_request = error?.config;
                
                if (error?.response?.status === 403 && !prev_request?.sent) {
                    prev_request.sent = true;
                    prev_request.headers['authorization'] = `Bearer ${access_token}`;
                    return axios(prev_request);
                }
                return Promise.reject(error);
            }
        );
        
        return () => {
            axios.interceptors.request.eject(reqInterseptor);
            axios.interceptors.response.eject(resInterseptor);
        }
    }, [dispatch]);

    return axios;
};

export default useAxios;