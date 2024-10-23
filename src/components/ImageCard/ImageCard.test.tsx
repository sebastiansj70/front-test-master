import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import ImageCard from './ImageCard';
import { likeImage } from '../../services/imageService';

jest.mock('../../services/imageService', () => ({
    likeImage: jest.fn(),
}));

const defaultProps = {
    id: 1,
    imageUrl: 'https://via.placeholder.com/150',
    title: 'Sample Image',
    price: 19.99,
    author: 'John Doe',
    liked: false,
    likes_count: 5,
};

describe('ImageCard Component', () => {
    it('should render the image, title, author, and price', () => {
        render(<ImageCard {...defaultProps} />);

        expect(screen.getByAltText('Sample Image')).toBeInTheDocument();
        expect(screen.getByText('Sample Image')).toBeInTheDocument();
        expect(screen.getByText('by')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        expect(screen.getByText('19.99 €')).toBeInTheDocument();
    });

    it('should display the correct initial like count', () => {
        render(<ImageCard {...defaultProps} />);
        expect(screen.getAllByText('005')).toHaveLength(2); 
    });

    it('should increment like count when like button is clicked', async () => {
        render(<ImageCard {...defaultProps} />);

        const likeButton = screen.getByTestId('like-button');

        await act(async () => {
            fireEvent.click(likeButton);
        });

        expect(screen.getAllByText('006')).toHaveLength(2); 
        expect(likeImage).toHaveBeenCalledWith(1); 
    });

    it('should decrement like count when like button is clicked again', async () => {
        const props = { ...defaultProps, liked: true };

        render(<ImageCard {...props} />);

        const likeButton = screen.getByTestId('like-button');

        await act(async () => {
            fireEvent.click(likeButton);
        });

        expect(screen.getAllByText('004')).toHaveLength(2); 
    });

    it('should increment reset count when reset button is clicked', () => {
        render(<ImageCard {...defaultProps} />);

        const resetButton = screen.getByTestId('reset-button');

        fireEvent.click(resetButton);

        expect(screen.getAllByText('001')).toHaveLength(2); 
    });
});
