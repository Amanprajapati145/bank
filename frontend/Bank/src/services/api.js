const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Account operations
  async getAccounts() {
    return this.request('/accounts');
  }

  async createAccount(accountData) {
    return this.request('/accounts', {
      method: 'POST',
      body: JSON.stringify(accountData),
    });
  }

  async updateAccount(id, accountData) {
    return this.request(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(accountData),
    });
  }

  async deleteAccount(id) {
    return this.request(`/accounts/${id}`, {
      method: 'DELETE',
    });
  }

  async deposit(id, amount) {
    return this.request(`/accounts/deposit/${id}?amount=${amount}`, {
      method: 'PUT',
    });
  }

  async withdraw(id, amount) {
    return this.request(`/accounts/withdraw/${id}?amount=${amount}`, {
      method: 'PUT',
    });
  }
}

export default new ApiService();
