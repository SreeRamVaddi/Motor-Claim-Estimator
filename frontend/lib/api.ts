import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
})

// Request interceptor: attach auth token if available
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor: normalize errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
            }
        }
        return Promise.reject(error)
    }
)

export const claimsAPI = {
    upload: (formData: FormData) =>
        api.post('/api/claims/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    getStatus: (claimId: string) =>
        api.get(`/api/claims/${claimId}/status`),

    getResult: (claimId: string) =>
        api.get(`/api/claims/${claimId}/result`),

    downloadReport: (claimId: string) =>
        api.get(`/api/claims/${claimId}/report`, { responseType: 'blob' }),
}

export const adminAPI = {
    getClaims: (page = 1, limit = 20) =>
        api.get('/api/admin/claims', { params: { page, limit } }),

    getDashboard: () =>
        api.get('/api/admin/dashboard'),
}

export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/api/auth/login', { email, password }),
}

export default api
