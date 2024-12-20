import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MovieForm from '@/components/movies/movieForm';
import MovieService from '@/services/movieService';
import { useTranslation } from 'next-i18next';
import '@testing-library/jest-dom';

// Mock movie service
jest.mock('@/services/movieService', () => ({
  addMovie: jest.fn(),
}));

// Mock useTranslation
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('MovieForm Component', () => {
  const mockAddMovie = MovieService.addMovie as jest.Mock;

  beforeEach(() => {
    mockAddMovie.mockReset();
  });

  test('renders form fields correctly', () => {
    render(<MovieForm />);

    expect(screen.getByLabelText('movies.form.name')).toBeInTheDocument();
    expect(screen.getByLabelText('movies.form.duration')).toBeInTheDocument();
    expect(screen.getByLabelText('movies.form.playingdates')).toBeInTheDocument();
    expect(screen.getByLabelText('movies.form.genre')).toBeInTheDocument();
    expect(screen.getByLabelText('movies.form.summary')).toBeInTheDocument();
  });

  test('handles adding a movie successfully', async () => {
    mockAddMovie.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });

    render(<MovieForm />);

    fireEvent.change(screen.getByLabelText('movies.form.name'), { target: { value: 'Test Movie' } });
    fireEvent.change(screen.getByPlaceholderText('Hours'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('Minutes'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('movies.form.genre'), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText('movies.form.summary'), { target: { value: 'A test movie summary.' } });

    fireEvent.submit(screen.getByRole('button', { name: 'movies.form.button' }));

    await waitFor(() => expect(mockAddMovie).toHaveBeenCalledTimes(1));
    expect(mockAddMovie).toHaveBeenCalledWith({
      name: 'Test Movie',
      duration: expect.any(Date),
      playingdates: [expect.any(Date)],
      genre: 'Action',
      summary: 'A test movie summary.',
    });
  });

  test('shows error message on submission failure', async () => {
    mockAddMovie.mockResolvedValue({ ok: false });

    render(<MovieForm />);

    fireEvent.change(screen.getByLabelText('movies.form.name'), { target: { value: 'Test Movie' } });
    fireEvent.change(screen.getByPlaceholderText('Hours'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('Minutes'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('movies.form.genre'), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText('movies.form.summary'), { target: { value: 'A test movie summary.' } });

    fireEvent.submit(screen.getByRole('button', { name: 'movies.form.button' }));

    await waitFor(() =>
      expect(screen.getByText('Failed to create movie')).toBeInTheDocument()
    );
  });

  test('adds and removes playing date fields dynamically', () => {
    render(<MovieForm />);

    const addDateButton = screen.getByRole('button', { name: 'movies.form.add_date' });
    fireEvent.click(addDateButton);

    const dateInputs = screen.getAllByPlaceholderText(/Select date/i);
    expect(dateInputs).toHaveLength(2);

    const removeButton = screen.getAllByRole('button', { name: 'movies.form.remove' })[0];
    fireEvent.click(removeButton);

    expect(screen.getAllByPlaceholderText(/Select date/i)).toHaveLength(1);
  });
});
