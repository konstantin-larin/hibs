import axios from 'axios';

const apiUrl = 'https://dev.madrocket.tech/api';
// Create axios instance with interceptors
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle token expiration and refresh token logic
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Attempt to refresh token
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (refreshTokenValue) {
                try {
                    const {accessToken} = await refreshToken(refreshTokenValue);
                    localStorage.setItem('accessToken', accessToken);
                    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                    return api(originalRequest); // Retry original request with new token
                } catch (err) {
                    console.error('Token refresh failed', err);
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);

// Function to handle user login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const accessToken = response.data.token;
        const refreshToken = response.data.refreshToken;
        return {accessToken, refreshToken};
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// Function to fetch user data
export const fetchUserData = async (accessToken) => {
    try {
        const response = await api.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
};

// Function to refresh access token
export const refreshToken = async (refreshToken) => {
    try {
        const response = await api.post('/auth/token', {
            refreshToken,
        });
        localStorage.setItem('accessToken', response.data.token);
        return response.data; // Предполагается, что в ответе будут новые токены
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error.response?.data || error.message);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error; // Пробрасываем ошибку дальше для обработки
    }
};

export const logoutUser = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const sendCodeOnEmail = async (email) => {
    try {
        const response = await axios.post( `https://dev.madrocket.tech/api/noauth/resendEmailActivation?email=${encodeURIComponent(email)}`);
        console.log('Код отправлен:', response.data);
    } catch (error) {
        throw new Error(error);
    }
}

export const signUpUser = async (userInfo) => {
    try {
        console.log(userInfo);
        const response = await api.post('/noauth/signup', userInfo);
        return response.data;
    } catch (error) {
        throw error; // Пробрасываем ошибку дальше для обработки
    }

}

