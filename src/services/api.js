import axios from 'axios';

const apiUrl = 'https://dev.madrocket.tech/api';
// Create axios instance with interceptors
let token = localStorage.getItem('accessToken');
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
                    const {token} = await refreshToken(refreshTokenValue);
                    localStorage.setItem('accessToken', token);
                    api.defaults.headers['Authorization'] = `Bearer ${token}`;
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
        token = accessToken;
        return {accessToken, refreshToken};
    } catch (error) {
        throw error;
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

export const sendActivationMail = async (email) => {
    try {
        const response = await api.post(`user/sendActivationMail`, {}, {params:{email: email}});
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signUpUser = async (userInfo) => {
    try {
        const response = await api.post('/noauth/signup', userInfo);
        return response.data;
    } catch (error) {
        throw new Error(error); // Пробрасываем ошибку дальше для обработки
    }

}


export const getUsers = async () => {
    try {
        const response = await api.get('/users', {
            params: {
                pageSize: 100000,
                page: 0,
            }
        });
        return response.data;
    } catch (err) {
        throw new Error(err)
    }
}

export const getUser = async (userId) => {
    try {
        const response = await api.get(`/user/`, {
            params: {userId}
        });
        return response.data;
    } catch (err) {
        throw new Error(err)
    }
}

export const postUser = async (user, sendActivationMail, admin) => {
    try {
        const newUser = {
            "tenantId": {
                "entityType": "TENANT",
                "id": admin.tenantId.id,
            },
            "customerId": {
                "entityType": "CUSTOMER",
                "id": "6889ea00-d1fb-11ef-bcf7-fdccb01d971f"
            },
            ...user,
            "additionalInfo": {}
        }
        //
        const response = await api.post(`/user`,
            newUser,
            {
                params: {sendActivationMail}
            })
        return response.data;
    } catch (err) {
        throw new Error(err)
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/user`,
            {
                params: {userId: id},
            })
        return response.data;
    } catch (err) {
        throw new Error(err)
    }
}