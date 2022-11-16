// input -> S04E01 -> output -> Episode 1 of the season 4
const episodeTextFormatter = (episodeText: string | null): string => {
  if (!episodeText) return '';
  const findFirstZero = /^0/;
  const [seasonNumber, episodeNumber] = episodeText
    .slice(1)
    .split('E')
    .map((text) => text.replace(findFirstZero, ''));

  return `Episode ${episodeNumber} of the season ${seasonNumber}`;
};

export default episodeTextFormatter;
