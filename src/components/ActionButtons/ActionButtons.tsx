import React from 'react';
import './ActionButtons.css';

interface ActionButtonsProps {
    isLiked: boolean;
    likeCount: number;
    resetCount: number;
    onLikeClick: () => void;
    onResetClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    isLiked,
    likeCount,
    resetCount,
    onLikeClick,
    onResetClick,
}) => {
    const formatCount = (count: number) => count.toString().padStart(3, '0');

    return (
        <div className="action-buttons-content">
            <div className="action-buttons-like-wrapper">
                <button className="action-buttons-like-button" onClick={onLikeClick}>
                    <i
                        className={`fa-heart ${isLiked ? 'fas' : 'far'}`}
                        style={{ fontSize: '24px', color: isLiked ? '#e63946' : '#686868' }}
                    ></i>
                </button>
                <span className="action-buttons-counter">{formatCount(likeCount)}</span>
            </div>
            <div className="action-buttons-reset-wrapper" >
                <button className="action-buttons-reset-button" onClick={onResetClick}>
                    <i
                        className="fas fa-arrow-rotate-left"
                        style={{ fontSize: '24px', color: resetCount > 0 ? '#e63946' : '#686868' }}
                    ></i>
                </button>
                <span className="action-buttons-counter">{formatCount(resetCount)}</span>
            </div>
        </div>
    );
};

export default ActionButtons;
