export const mockMetadata = (target: any) => {
    if (typeof Symbol === "undefined" || !("metadata" in Symbol) || !Symbol.metadata) {
        return undefined;
    }

    target[Symbol.metadata] ??= {};

    return target[Symbol.metadata];
};
