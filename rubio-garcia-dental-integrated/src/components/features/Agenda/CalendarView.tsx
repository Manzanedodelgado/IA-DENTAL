import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
    currentDate: Date;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
    currentDate,
    selectedDate,
    onDateChange,
    onPrevMonth,
    onNextMonth
}) => {
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (number | null)[] = [];

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const isToday = (day: number | null) => {
        if (!day) return false;
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (day: number | null) => {
        if (!day) return false;
        return (
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        );
    };

    const days = getDaysInMonth(currentDate);
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
        <div className="w-80 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-brand-dark">
                    {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-1">
                    <button
                        onClick={onPrevMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={onNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (day) {
                                const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                onDateChange(newDate);
                            }
                        }}
                        disabled={!day}
                        className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all ${!day
                                ? 'invisible'
                                : isSelected(day)
                                    ? 'bg-brand-blue text-white font-bold shadow-md'
                                    : isToday(day)
                                        ? 'bg-brand-lime/20 text-brand-dark font-bold'
                                        : 'hover:bg-gray-100 text-gray-700'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Today button */}
            <button
                onClick={() => onDateChange(new Date())}
                className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-brand-dark rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
                <CalendarIcon size={16} /> Hoy
            </button>
        </div>
    );
};
