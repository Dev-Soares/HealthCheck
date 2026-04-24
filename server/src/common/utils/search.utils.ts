export function rankByRelevance<T extends { name: string }>(
  items: T[],
  query: string,
): T[] {
  const normalized = query.trim().toLowerCase();

  return [...items].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aStarts = aName.startsWith(normalized);
    const bStarts = bName.startsWith(normalized);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return aName.localeCompare(bName, 'pt-BR');
  });
}

export function splitSearchWords(query: string): string[] {
  return query.trim().split(/\s+/).filter(Boolean);
}
