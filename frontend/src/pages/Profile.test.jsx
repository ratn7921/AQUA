// Profile.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import axios from '../api/axios';
import userEvent from '@testing-library/user-event';

jest.mock('../api/axios'); // mock axios requests

const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  role: 'tourist',
  description: 'Ocean lover.',
  avatar: '/uploads/test.png',
  createdAt: new Date().toISOString()
};

describe('🧪 Profile Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'dummy-token'); // simulate logged in
    axios.get.mockResolvedValueOnce({ data: mockUser });
  });

  it('renders user profile details', async () => {
    render(<Profile />);
    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('tourist')).toBeInTheDocument();
      expect(screen.getByText(/Ocean lover/)).toBeInTheDocument();
    });
  });

  it('enters edit mode and handles image upload', async () => {
    render(<Profile />);
    await screen.findByText('Edit Profile');
    fireEvent.click(screen.getByText('Edit Profile'));

    const fileInput = screen.getByLabelText(/avatar image/i);
    const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });
    userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(fileInput.files[0].name).toBe('avatar.png');
      expect(fileInput.files[0].type).toBe('image/png');
    });

    expect(await screen.findByAltText(/preview/i)).toBeInTheDocument();
  });

  it('shows error for invalid file type', async () => {
    render(<Profile />);
    await screen.findByText('Edit Profile');
    fireEvent.click(screen.getByText('Edit Profile'));

    const fileInput = screen.getByLabelText(/avatar image/i);
    const badFile = new File(['bad'], 'file.txt', { type: 'text/plain' });
    userEvent.upload(fileInput, badFile);

    await waitFor(() => {
      expect(screen.getByText(/please select a valid image/i)).toBeInTheDocument();
    });
  });
});
