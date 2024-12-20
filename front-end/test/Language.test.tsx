import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Language from '@/components/language/Language';
import { useRouter } from 'next/router';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Language Component', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      locale: 'en',
      pathname: '/',
      asPath: '/',
      query: {},
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default locale', () => {
    render(<Language />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('en');
  });

  test('changes locale when a new language is selected', () => {
    render(<Language />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'es' } });

    expect(pushMock).toHaveBeenCalledWith(
      { pathname: '/', query: {} },
      '/',
      { locale: 'es' }
    );
  });
});
