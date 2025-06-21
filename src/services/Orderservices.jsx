// src/services/orderService.js
import api from './api';

export const createOrder = (orderData) => api.post('/orders', orderData);

export const getUserOrders = () => api.get('/orders/my');

export const getOrderById = (id) => api.get(`/orders/${id}`);
