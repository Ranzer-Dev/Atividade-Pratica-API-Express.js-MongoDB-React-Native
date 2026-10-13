const API_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

async function request(path, { token, ...options } = {}) {
    const headers = { ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });
    let body = null;
    if (response.status !== 204) {
        try {
            body = await response.json();
        } catch {
            throw new Error('O servidor retornou uma resposta inválida.');
        }
    }
    if (!response.ok) {
        throw new Error(body?.message || `Erro na solicitação (${response.status}).`);
    }
    return body;
}

export const api = {
    request,
    imageUrl(path) {
        return path.startsWith('http') ? path : `${API_URL}${path}`;
    },
    getContent(query = '') {
        const suffix = query ? `?q=${encodeURIComponent(query)}` : '';
        return request(`/api/content${suffix}`);
    },
    createContent(content, token) {
        return request('/api/content', { method: 'POST', body: content, token });
    },
    updateContent(id, content, token) {
        return request(`/api/content/${id}`, { method: 'PUT', body: content, token });
    },
    deleteContent(id, token) {
        return request(`/api/content/${id}`, { method: 'DELETE', token });
    },
    uploadImage(id, asset, token) {
        const form = new FormData();
        form.append('image', {
            uri: asset.uri,
            name: asset.fileName || `image-${Date.now()}.jpg`,
            type: asset.mimeType || 'image/jpeg',
        });
        return request(`/api/content/${id}/image`, { method: 'POST', body: form, token });
    },
    deleteImage(id, token) {
        return request(`/api/content/${id}/image`, { method: 'DELETE', token });
    },
    login(email, password) {
        return request('/api/auth/login', { method: 'POST', body: { email, password } });
    },
    register(name, email, password) {
        return request('/api/auth/register', { method: 'POST', body: { name, email, password } });
    },
};
