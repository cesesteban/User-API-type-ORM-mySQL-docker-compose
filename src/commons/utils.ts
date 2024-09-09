export function nonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

export function isNull<T>(value: T | null | undefined): value is T {
    return value == null && value == undefined;
}

const camelToSnake = (str: string): string => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const convertObjectKeysToSnakeCase = (obj: any): any => {
    if (obj instanceof Date) {
        return obj.toISOString();
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => convertObjectKeysToSnakeCase(item));
    }

    if (obj && typeof obj === 'object') {
        return Object.keys(obj).reduce(
            (acc, key) => {
                const snakeCaseKey = camelToSnake(key);
                acc[snakeCaseKey] = convertObjectKeysToSnakeCase(obj[key]);
                return acc;
            },
            {} as Record<string, any>
        );
    }

    return obj;
};
