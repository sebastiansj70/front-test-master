import React, { useCallback, useEffect, useState } from 'react'
import ImageCard from '../../components/ImageCard/ImageCard'
import "./Home.css"
import { fetchImages } from '../../services/imageService'
import { Image } from '../../types/Image'
import Header from '../../components/Header/Header'

const Home: React.FC = () => {
    const [images, setImages] = useState<Image[]>([])
    const [filteredImages, setFilteredImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, seterror] = useState<string | null>(null)


    const handleGetImages = async () => {
        try {
            const data = await fetchImages()
            setImages(data)
            setFilteredImages(data);
        } catch (error: any) {
            seterror(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetImages()
    }, [])

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearch = useCallback(
        debounce((query: string) => {
            if (!query.trim()) {
                setFilteredImages(images);
                return;
            }

            const result = images.filter(
                (image) =>
                    image.title.toLowerCase().includes(query.toLowerCase()) ||
                    image.author.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredImages(result);
        }, 300),
        [images]
    );


    if (loading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div>{error}</div>
    }
    return (
        <>
            <Header onSearch={handleSearch} />
            <div className="home-container">
                <div className="image-grid">
                    {filteredImages.map((image, index) => (
                        <ImageCard
                            key={index}
                            id={image.id}
                            imageUrl={image.main_attachment.small}
                            title={image.title}
                            price={image.price}
                            author={image.author}
                            liked={image.liked}
                            likes_count={image.likes_count}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}


export default Home