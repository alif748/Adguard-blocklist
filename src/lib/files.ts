const modules = import.meta.glob([
    '/static/*.txt',
    '!/static/robots.txt'
], {
    query: '?url',
    import: 'default',
    eager: true
}) as Record<string, string>;

function toLabel(fileName: string) {
    return fileName
        .replace(/\.txt$/, '')
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

export const txtFiles = Object.entries(modules)
    .map(([path, url]) => {
        const fileName = path.split('/').pop() ?? '';

        return {
            fileName,
            label: toLabel(fileName),
            url
        };
    })
    .sort((a, b) => a.label.localeCompare(b.label));