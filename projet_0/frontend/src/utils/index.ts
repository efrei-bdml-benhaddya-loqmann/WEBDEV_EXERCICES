export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};

export const isMobileScreen = (): boolean => {
    return typeof window !== 'undefined' && window.innerWidth < 1024;
};

export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const getErrorMessage = (error: unknown, fallback = 'An error occurred'): string => {
    if (error instanceof Error) return error.message;
    return typeof error === 'string' ? error : fallback;
};
