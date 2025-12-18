import { useState, DragEvent } from 'react';

interface DragItem {
    id: string;
    type: string;
    data: any;
}

interface UseDragAndDropReturn {
    draggedItem: DragItem | null;
    isDragging: boolean;
    handleDragStart: (item: DragItem) => (e: DragEvent) => void;
    handleDragEnd: () => void;
    handleDragOver: (e: DragEvent) => void;
    handleDrop: (onDrop: (item: DragItem) => void) => (e: DragEvent) => void;
}

/**
 * Custom hook for handling drag and drop operations
 * Useful for calendar appointments, task boards, etc.
 * 
 * @example
 * const { draggedItem, handleDragStart, handleDrop } = useDragAndDrop();
 * 
 * <div 
 *   draggable 
 *   onDragStart={handleDragStart({ id: '1', type: 'appointment', data: appointment })}
 * >
 *   Drag me
 * </div>
 * 
 * <div onDrop={handleDrop((item) => {
 *   console.log('Dropped:', item);
 * })}>
 *   Drop here
 * </div>
 */
export const useDragAndDrop = (): UseDragAndDropReturn => {
    const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (item: DragItem) => (e: DragEvent) => {
        setDraggedItem(item);
        setIsDragging(true);

        // Set data for potential external drop zones
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/json', JSON.stringify(item));
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (onDrop: (item: DragItem) => void) => (e: DragEvent) => {
        e.preventDefault();

        // Try to get item from state first, fallback to dataTransfer
        let item = draggedItem;

        if (!item) {
            try {
                const data = e.dataTransfer.getData('application/json');
                if (data) {
                    item = JSON.parse(data);
                }
            } catch (error) {
                console.error('Error parsing dropped data:', error);
            }
        }

        if (item && onDrop) {
            onDrop(item);
        }

        handleDragEnd();
    };

    return {
        draggedItem,
        isDragging,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    };
};
