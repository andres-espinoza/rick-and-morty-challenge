import { ApolloQueryResult } from '@apollo/client';

const apolloErrorChecker = <T>(
  response: ApolloQueryResult<T>,
  serviceType: string
): NonNullable<T> => {
  if (response?.error) {
    console.error(`Error getting ${serviceType}: ${response.error?.message}`);
    throw Error(response.error.message);
  }

  if (response?.errors && response.errors.length > 0) {
    response.errors?.forEach((error, idx) =>
      console.error(
        `Error #${idx + 1} getting ${serviceType}: ${error?.message}`
      )
    );
    throw Error(response.errors[0].message);
  }

  if (!response || !response?.data) {
    throw new Error(`Error getting ${serviceType}`);
  }

  const { data } = response;

  return data;
};

export default apolloErrorChecker;
