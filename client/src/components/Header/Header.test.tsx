import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './index';

test('renders name logo and score', () => {
    render(<Header name="Julius" gamePoints={20} />);
    const nameEl = screen.getByText(/Julius/i);
    const logoEl = screen.getByText(/Snakey/i);
    const scoreEl = screen.getByText(/20/i);
    expect(nameEl).toBeInTheDocument();
    expect(logoEl).toBeInTheDocument();
    expect(scoreEl).toBeInTheDocument();
});
