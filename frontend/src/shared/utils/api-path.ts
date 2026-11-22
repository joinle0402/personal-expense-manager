export function joinpath(...segments: string[]) {
    return segments
        .map(segment => segment.replace(/^\/+|\/+$/g, ''))
        .filter(Boolean)
        .join('/');
}
