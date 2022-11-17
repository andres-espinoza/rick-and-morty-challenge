type EpisodeTextDetail = 'season' | 'episode';

const episodeTextSplitter = (
  episodeText: string,
  detail: EpisodeTextDetail
): string => {
  const findFirstZero = /^0/;
  const [seasonNumber, episodeNumber] = episodeText
    .slice(1)
    .split('E')
    .map((text) => text.replace(findFirstZero, ''));
  if (detail === 'season') return seasonNumber;
  return episodeNumber;
};

export default episodeTextSplitter;
