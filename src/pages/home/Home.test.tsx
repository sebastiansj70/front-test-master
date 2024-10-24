import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './Home';
import { fetchImages } from '../../services/imageService';
import { Image } from '../../types/Image';

jest.mock('../../services/imageService');

const mockedFetchImages = fetchImages as jest.Mock;

describe('Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display loading state initially', () => {
        render(<Home />);
        expect(screen.getByText(/Loading....+/)).toBeInTheDocument();
    });

    it('should display images after fetching successfully', async () => {
        const mockImages: Image[] = [
            {
                type: 'image',
                id: 1,
                title: 'Image 1',
                price: 10,
                author: 'Author 1',
                created_at: '2021-01-01',
                main_attachment: { big: 'url-big-1', small: 'url-small-1' },
                likes_count: 5,
                liked: false,
                links: []
            },
            {
                type: 'image',
                id: 2,
                title: 'Image 2',
                price: 20,
                author: 'Author 2',
                created_at: '2021-01-02',
                main_attachment: { big: 'url-big-2', small: 'url-small-2' },
                likes_count: 10,
                liked: true,
                links: []
            }
        ];

        mockedFetchImages.mockResolvedValueOnce(mockImages);

        render(<Home />);

        await waitFor(() => expect(screen.queryByText(/Loading....+/)).not.toBeInTheDocument());

        expect(screen.getByText('Image 1')).toBeInTheDocument();
        expect(screen.getByText('Image 2')).toBeInTheDocument();
    });

    it('should display an error message when fetching images fails', async () => {
        mockedFetchImages.mockRejectedValueOnce(new Error('Error fetching images'));

        render(<Home />);

        await waitFor(() => expect(screen.queryByText(/Loading....+/)).not.toBeInTheDocument());
        expect(screen.getByText('Error fetching images')).toBeInTheDocument();
    });

    it('should filter images based on search query', async () => {
        const mockImages: Image[] = [
            {
                type: 'image',
                id: 1,
                title: 'Image 1',
                price: 10,
                author: 'Author 1',
                created_at: '2021-01-01',
                main_attachment: { big: 'url-big-1', small: 'url-small-1' },
                likes_count: 5,
                liked: false,
                links: []
            },
            {
                type: 'image',
                id: 2,
                title: 'Image 2',
                price: 20,
                author: 'Author 2',
                created_at: '2021-01-02',
                main_attachment: { big: 'url-big-2', small: 'url-small-2' },
                likes_count: 10,
                liked: true,
                links: []
            }
        ];

        mockedFetchImages.mockResolvedValueOnce(mockImages);

        render(<Home />);

        await waitFor(() => expect(screen.queryByText(/Loading....+/)).not.toBeInTheDocument());

        const searchInput = screen.getByPlaceholderText("You're looking for something?");
        fireEvent.change(searchInput, { target: { value: 'Image 1' } });

        await waitFor(() => {
            expect(screen.getByText('Image 1')).toBeInTheDocument();
            expect(screen.queryByText('Image 2')).not.toBeInTheDocument();
        });

        fireEvent.change(searchInput, { target: { value: 'Author 2' } });

        await waitFor(() => {
            expect(screen.getByText('Image 2')).toBeInTheDocument();
            expect(screen.queryByText('Image 1')).not.toBeInTheDocument();
        });
    });
});
