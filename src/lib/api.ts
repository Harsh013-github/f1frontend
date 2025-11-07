const API_BASE_URL = 'http://localhost:3000/api';

export interface Car {
  car_id: string;
  car_name: string;
  constructor: string;
  season: string;
  driver: string;
  car_number: number;
  chassis_code: string;
  engine_supplier: string;
  engine_type: string;
  rpm_limit: number;
  tyre_supplier: string;
  chassis_material: string;
  front_wing: string;
  rear_wing: string;
  floor_design: string;
  diffuser: string;
  sidepods: string;
  halo: string;
  length_m: number;
  width_m: number;
  height_m: number;
  wheelbase_m: number;
  minimum_weight_kg: number;
  acceleration_0_100_kmh: number;
  top_speed_kmh: number;
  downforce_kgf: number;
  cornering_g_force: number;
  fuel_capacity_kg: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    email: string;
    token?: string;
  };
}

class ApiService {
  private getAuthHeader() {
    const token = localStorage.getItem('f1_auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async signup(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success && data.data?.token) {
      localStorage.setItem('f1_auth_token', data.data.token);
    }
    return data;
  }

  async getCars(): Promise<Car[]> {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      headers: this.getAuthHeader(),
    });
    const data = await response.json();
    return data.data || [];
  }

  async getCar(id: string): Promise<Car> {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      headers: this.getAuthHeader(),
    });
    const data = await response.json();
    return data.data;
  }

  async createCar(car: Partial<Car>): Promise<Car> {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    return data.data;
  }

  async updateCar(id: string, car: Partial<Car>): Promise<Car> {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    return data.data;
  }

  async deleteCar(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });
  }

  logout() {
    localStorage.removeItem('f1_auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('f1_auth_token');
  }
}

export const api = new ApiService();
