export const isFileSizeExceeded = (files: File[], maxSizeMB: number): boolean => {
    const totalSizeMB = files.reduce((total, file) => total + file.size / (1024 * 1024), 0);
    return totalSizeMB > maxSizeMB;
};