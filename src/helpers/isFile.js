export const isFile = (input) => {
    if ('File' in window && input instanceof File) {
        return true;
    }

    return false;
}