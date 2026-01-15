import { clamp, randomInt, formatScore } from '@/lib/utils/helpers';

describe('helpers', () => {
  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should return min when value is below min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return max when value is above max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle equal min and max', () => {
      expect(clamp(5, 7, 7)).toBe(7);
    });
  });

  describe('randomInt', () => {
    it('should return number within range', () => {
      const result = randomInt(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('should return min when min equals max', () => {
      expect(randomInt(5, 5)).toBe(5);
    });

    it('should generate different values over multiple calls', () => {
      const values = new Set();
      for (let i = 0; i < 100; i++) {
        values.add(randomInt(0, 100));
      }
      expect(values.size).toBeGreaterThan(1);
    });
  });

  describe('formatScore', () => {
    it('should format single digit with leading zeros', () => {
      expect(formatScore(5)).toBe('00005');
    });

    it('should format multiple digits with leading zeros', () => {
      expect(formatScore(123)).toBe('00123');
    });

    it('should not add leading zeros when 5 digits', () => {
      expect(formatScore(12345)).toBe('12345');
    });

    it('should handle zero', () => {
      expect(formatScore(0)).toBe('00000');
    });

    it('should handle numbers greater than 5 digits', () => {
      expect(formatScore(123456)).toBe('123456');
    });
  });
});
