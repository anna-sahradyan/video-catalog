import { formatDuration } from '@/hooks/formatDuration';

describe('formatDuration', () => {
    it('форматирует секунды для времени менее минуты', () => {
        expect(formatDuration(30)).toBe('0:30');
    });

    it('форматирует секунды для ровно одной минуты', () => {
        expect(formatDuration(60)).toBe('1:00');
    });

    it('форматирует секунды для нескольких минут и секунд', () => {
        expect(formatDuration(125)).toBe('2:05');
        expect(formatDuration(3665)).toBe('1:01:05');
    });

    it('форматирует секунды для нуля секунд', () => {
        expect(formatDuration(0)).toBe('0:00');
    });

    it('обрабатывает отрицательные значения (например, -10 секунд)', () => {
        expect(formatDuration(-10)).toBe('0:00');
    });

    it('обрабатывает большое количество секунд (например, 10000 секунд)', () => {
        expect(formatDuration(10000)).toBe('2:46:40');
    });

    it('обрабатывает большие числа секунд', () => {
        expect(formatDuration(5400)).toBe('1:30:00');
        expect(formatDuration(3600)).toBe('1:00:00');
    });
});
