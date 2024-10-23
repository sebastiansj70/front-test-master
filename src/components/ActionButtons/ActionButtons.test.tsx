import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionButtons from './ActionButtons';

describe('ActionButtons Component', () => {
    const onLikeClick = jest.fn();
    const onResetClick = jest.fn();

    const defaultProps = {
        isLiked: false,
        likeCount: 0,
        resetCount: 0,
        onLikeClick,
        onResetClick,
    };

    const resizeWindow = (width: number) => {
        window.innerWidth = width;
        window.dispatchEvent(new Event('resize'));
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not be visible on large screens', () => {
        Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
        window.dispatchEvent(new Event('resize'));

        render(<ActionButtons {...defaultProps} />);

        const actionButtonsContent = screen.queryByTestId('action-buttons-content');
        expect(actionButtonsContent).not.toBeInTheDocument();
    });

    it('should be visible on small screens', () => {
        resizeWindow(640);
        render(<ActionButtons {...defaultProps} />);

        const actionButtons = screen.getAllByRole('button');
        expect(actionButtons).toHaveLength(2);
    });

    it('should call onLikeClick when the like button is clicked', () => {
        resizeWindow(640);
        render(<ActionButtons {...defaultProps} />);

        const likeButton = screen.getAllByRole('button')[0];
        fireEvent.click(likeButton);

        expect(onLikeClick).toHaveBeenCalledTimes(1);
    });

    it('should call onResetClick when the reset button is clicked', () => {
        resizeWindow(640);
        render(<ActionButtons {...defaultProps} />);

        const resetButton = screen.getAllByRole('button')[1];
        fireEvent.click(resetButton);

        expect(onResetClick).toHaveBeenCalledTimes(1);
    });

    it('should display the correct like and reset counts', () => {
        resizeWindow(640);
        render(
            <ActionButtons
                {...defaultProps}
                likeCount={5}
                resetCount={10}
                isLiked={true}
            />
        );

        expect(screen.getAllByText('005')).toHaveLength(1);
        expect(screen.getAllByText('010')).toHaveLength(1);
    });

    it('should apply the correct styles based on isLiked prop', () => {
        resizeWindow(640);
        render(<ActionButtons {...defaultProps} isLiked={true} />);

        const likeIcon = screen.getAllByRole('button')[0].firstChild;
        expect(likeIcon).toHaveClass('fas');
        expect(likeIcon).toHaveStyle('color: #e63946');
    });

    it('should apply the correct styles based on resetCount prop', () => {
        resizeWindow(640);
        render(<ActionButtons {...defaultProps} resetCount={3} />);

        const resetIcon = screen.getAllByRole('button')[1].firstChild;
        expect(resetIcon).toHaveStyle('color: #e63946');
    });
});
