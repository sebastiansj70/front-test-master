import React, { useState } from 'react';
import './ImageCard.css';
import ActionButtons from '../ActionButtons/ActionButtons';
import { likeImage } from '../../services/imageService';

interface ImageCardProps {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    author: string;
    liked: boolean;
    likes_count: number;

}

const ImageCard: React.FC<ImageCardProps> = ({ id, imageUrl, title, price, author, liked, likes_count }) => {
    const [isliked, setLiked] = useState(liked);
    const [reset, setReset] = useState(false);
    const [likeCount, setLikeCount] = useState(likes_count);
    const [resetCount, setResetCount] = useState(0);

    const handleLikeClick = async () => {
        if (!isliked) {
            await sendLike()
        }
        setLiked(!isliked);
        setLikeCount((prev) => (!isliked ? prev + 1 : prev - 1));
    };

    const handleResetClick = () => {
        console.log("Reset button clicked");
        setReset(!reset);
        setResetCount((prev) => (!reset ? prev + 1 : prev - 1));
    };

    const formatCount = (count: number) => count.toString().padStart(3, '0');

    const formatPrice = (price: number) => {
        return `${price.toFixed(2)} €`;
    };

    const sendLike = async () => {
        try {
            await likeImage(id)
        } catch (error) {
            console.error('Error enviando like:', error);
        }
    }

    return (
        <div className="card-container">
            <div className="card">
                <div className="image-wrapper">
                    <img src={imageUrl} alt={title} className="image" loading="lazy" />
                    <div className="price-badge">
                        <div className="price-badge-content">{formatPrice(price)}</div>
                    </div>

                    <div className="action-buttons">
                        <div className="button-wrapper">
                            <button className="like-button" onClick={handleLikeClick}>
                                <i
                                    className={`fa-heart ${isliked ? 'fas' : 'far'}`}
                                    style={{
                                        fontSize: '24px',
                                        color: isliked ? '#e63946' : '#FFF',
                                    }}
                                ></i>
                            </button>
                            <span className="counter">{formatCount(likeCount)}</span>
                        </div>

                        <div className="button-wrapper">
                            <button className="reset-button" onClick={handleResetClick}>
                                <i
                                    className="fas fa-arrow-rotate-left"
                                    style={{
                                        fontSize: '24px',
                                        color: reset ? '#e63946' : '#FFF',
                                    }}
                                ></i>
                            </button>
                            <span className="counter">{formatCount(resetCount)}</span>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <h3 className="title">{title}</h3>
                    <p className="subtitle">
                        <span className="prefix">by </span>
                        <span className="author">{author}</span>
                    </p>
                </div>

                <ActionButtons
                    isLiked={isliked}
                    likeCount={likeCount}
                    resetCount={resetCount}
                    onLikeClick={handleLikeClick}
                    onResetClick={handleResetClick}
                />
            </div>
        </div>
    );
};

export default ImageCard;
