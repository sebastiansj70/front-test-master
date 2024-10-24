import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchImages, likeImage } from './imageService'; 
import { Image } from '../types/Image'; 

const API_URL = 'http://localhost:3100/images';

describe('Image Service', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('fetchImages', () => {
        it('should fetch images successfully', async () => {
            const mockImages: Image[] = [
                {
                    type: 'image',
                    id: 1,
                    title: 'Image 1',
                    price: 19.99,
                    author: 'Author 1',
                    created_at: '2024-01-01T00:00:00Z',
                    main_attachment: {
                        big: 'url_big1',
                        small: 'url_small1',
                    },
                    likes_count: 5,
                    liked: false,
                    links: [
                        { rel: 'self', uri: '/images/1', methods: 'GET' },
                        { rel: 'like', uri: '/images/1/likes', methods: 'POST' },
                    ],
                },
                {
                    type: 'image',
                    id: 2,
                    title: 'Image 2',
                    price: 29.99,
                    author: 'Author 2',
                    created_at: '2024-01-02T00:00:00Z',
                    main_attachment: {
                        big: 'url_big2',
                        small: 'url_small2',
                    },
                    likes_count: 10,
                    liked: true,
                    links: [
                        { rel: 'self', uri: '/images/2', methods: 'GET' },
                        { rel: 'like', uri: '/images/2/likes', methods: 'POST' },
                    ],
                },
            ];

            mock.onGet(API_URL).reply(200, mockImages);

            const images = await fetchImages();

            expect(images).toEqual(mockImages);
        });

        it('should throw an error when fetching images fails', async () => {
            mock.onGet(API_URL).reply(500);

            await expect(fetchImages()).rejects.toThrow('Error fetching images');
        });
    });

    describe('likeImage', () => {
        it('should like an image successfully', async () => {
            const imageId = 1;

            mock.onPost(`${API_URL}/${imageId}/likes`).reply(200, { success: true });

            await expect(likeImage(imageId)).resolves.not.toThrow();
        });

        it('should throw an error when liking an image fails', async () => {
            const imageId = 1;

            mock.onPost(`${API_URL}/${imageId}/likes`).reply(500);

            await expect(likeImage(imageId)).rejects.toThrow('Error liking image');
        });
    });
});
