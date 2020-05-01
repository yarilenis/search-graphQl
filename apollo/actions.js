import apolloClient from './index';
import {
  jobs,
  countries,
  companies,
} from './graph.actions';

const actions = {
  getJobs() {
    return apolloClient.query({
      query: jobs,
    });
  },
  getCountries(search) {
    return apolloClient.query({
      query: countries,
      variables: {
        search,
      },
    });
  },
  getCompanies(search) {
    return apolloClient.query({
      query: companies,
      variables: {
        search,
      },
    });
  },
};

export default actions;
