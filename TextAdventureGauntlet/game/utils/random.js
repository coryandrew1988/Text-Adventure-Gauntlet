import randomSeed from 'random-seed';
import weighted from 'weighted';

const normalizeWeights = weights => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  return weights.map(weight => weight / totalWeight);
};

const createWeightedSampler = (source, items, weights) => {
  const normalizedWeights = normalizeWeights(weights);

  return {
    sample: () => weighted.select(items, normalizedWeights, source.random)
  };
};

export const createRandomSource = (seed) => {
  const rand = randomSeed.create(seed);

  const createSource = () => createRandomSource(rand.string(64));

  return {
    createSource,
    random: () => rand.random(),
    sample: items => items[rand.range(items.length)],
    range: n => rand.range(n),
    createWeightedSampler: (items, weights) => createWeightedSampler(createSource(), items, weights)
  };
};
