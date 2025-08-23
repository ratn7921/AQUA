// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ReportIncident from './ReportIncident';
// import axios from '../api/axios';

// jest.mock('../api/axios');

// describe('ReportIncident', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders all form fields', () => {
//     render(<ReportIncident />);
//     expect(screen.getByText(/Report Incident/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Photo URL/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Latitude/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Longitude/i)).toBeInTheDocument();
//     expect(screen.getByRole('combobox')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
//   });

//   it('shows error on failed submit', async () => {
//     axios.post.mockRejectedValue({ response: { data: { message: 'Failed' } } });
//     render(<ReportIncident />);
//     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'pollution' } });
//     fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Test desc' } });
//     fireEvent.change(screen.getByPlaceholderText(/Photo URL/i), { target: { value: 'http://img.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Latitude/i), { target: { value: '12.34' } });
//     fireEvent.change(screen.getByPlaceholderText(/Longitude/i), { target: { value: '56.78' } });
//     fireEvent.click(screen.getByRole('button', { name: /submit/i }));
//     await waitFor(() => {
//       expect(screen.getByText(/Failed/)).toBeInTheDocument();
//     });
//   });

//   it('shows success on successful submit', async () => {
//     axios.post.mockResolvedValue({});
//     render(<ReportIncident />);
//     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'pollution' } });
//     fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Test desc' } });
//     fireEvent.change(screen.getByPlaceholderText(/Photo URL/i), { target: { value: 'http://img.com' } });
//     fireEvent.change(screen.getByPlaceholderText(/Latitude/i), { target: { value: '12.34' } });
//     fireEvent.change(screen.getByPlaceholderText(/Longitude/i), { target: { value: '56.78' } });
//     fireEvent.click(screen.getByRole('button', { name: /submit/i }));
//     await waitFor(() => {
//       expect(screen.getByText(/Incident reported successfully/i)).toBeInTheDocument();
//     });
//   });
// });



const mongoose = require('mongoose');
const request = require('supertest');
const path = require('path');
const app = require('../app');
require('dotenv').config();

jest.setTimeout(30000);

let token;
let tripId;

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for testing');
  } catch (err) {
    console.error('❌ MongoDB connection error in test:', err);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('🌊 AquaWeb API - Core Features', () => {
  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456',
        role: 'tourist'
      });
    expect([200, 201, 400]).toContain(res.statusCode);
    if (res.body.token) token = res.body.token;
  });

  it('logs in a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: '123456'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('gets user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('testuser@example.com');
  });

  it('updates user profile with avatar upload', async () => {
    const res = await request(app)
      .post('/api/users/me/update')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', path.join(__dirname, 'fixtures/avatar.png'))
      .field('name', 'Updated Test User')
      .field('description', 'Bio updated during testing');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Test User');
    expect(res.body.avatar).toMatch(/uploads\//);
  });

  it('starts a trip', async () => {
    const res = await request(app)
      .post('/api/trips/start')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
    tripId = res.body._id;
  });

  it('ends a trip', async () => {
    const res = await request(app)
      .put(`/api/trips/end/${tripId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.endTime).toBeDefined();
  });

  it('creates a sighting', async () => {
    const res = await request(app)
      .post('/api/sightings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'Humpback Whale',
        count: 2,
        behavior: 'Breaching',
        location: { lat: 18.5, lng: 73.9 },
        photoUrl: 'https://sample.com/image.jpg'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.species).toBe('Humpback Whale');
  });

  it('gets all sightings', async () => {
    const res = await request(app).get('/api/sightings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('reports an incident', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'pollution',
        description: 'Oil spill detected',
        location: { lat: 18.3, lng: 73.8 },
        photoUrl: 'https://sample.com/spill.jpg'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.type).toBe('pollution');
  });

  it('gets all species', async () => {
    const res = await request(app).get('/api/species');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('fetches user activity feed', async () => {
    const res = await request(app)
      .get('/api/users/activity')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('🌐 External Marine API (/api/worms/:name)', () => {
  it('fetches marine species from WoRMS API', async () => {
    const res = await request(app).get('/api/worms/Clownfish');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(['WoRMS', 'FishWatch']).toContain(res.body[0].source);
  });

  it('uses FishWatch fallback if WoRMS fails', async () => {
    const res = await request(app).get('/api/worms/fish');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('source');
  });

  it('returns 500 for invalid species', async () => {
    const res = await request(app).get('/api/worms/invalid-species-name-xyz123');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});

describe('🔐 Security & Validation', () => {
  it('fails to register with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'incomplete@example.com' });
    expect(res.statusCode).toBe(400);
  });

  it('fails login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'wrongpass' });
    expect([400, 401]).toContain(res.statusCode);
  });

  it('denies access without token', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.statusCode).toBe(401);
  });

  it('denies access with invalid token', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toBe(401);
  });

  it('returns 404 for unknown route', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
  });

  it('returns error for trip end with invalid ID', async () => {
    const res = await request(app)
      .put('/api/trips/end/invalidid')
      .set('Authorization', `Bearer ${token}`);
    expect([400, 500]).toContain(res.statusCode);
  });

  it('fails to create sighting with missing fields', async () => {
    const res = await request(app)
      .post('/api/sightings')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect([400, 500]).toContain(res.statusCode);
  });

  it('fails to report incident with missing fields', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect([400, 500]).toContain(res.statusCode);
  });
});
