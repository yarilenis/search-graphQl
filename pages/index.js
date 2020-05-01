// Import from libs
import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

import apollo from '../apollo/actions';

// import components
import LayoutWrapper from '../layout/default';
import Search from '../components/Search';
import List from '../components/List';

const propTypes = {
  jobs: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      jobs: [],
      form: {
        country: '',
        company: '',
      },
    };
  }

  componentDidMount() {
    this.initData();
  }

  static async getInitialProps() {
    const { data: { jobs } } = await apollo.getJobs();
    const { data: { countries } } = await apollo.getCountries();
    const { data: { companies } } = await apollo.getCompanies();

    return {
      jobs,
      countries,
      companies,
    };
  }

  onKeyPressSearch = (e) => {
    const search = e.target.value;
    if (e.which === 13) {
      this.onChangeSearch(search);
      e.preventDefault();
    }
  }

  onChangeQuery = (e) => {
    const search = e.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onChangeSearch(search);
    }, 1500);
  }

  onResetSearchText = () => {
    this.onChangeSearch(null);
  }

  onChangeSearch = async (search) => {
    const { jobs } = this.props;

    if (search) {
      const { data: { countries } } = await apollo.getCountries(search.toLowerCase());
      const jobsSearch = [];
      this.setState({
        loading: true,
        form: {
          country: '',
          company: '',
        },
      });

      countries.forEach((item) => {
        if (item.jobs) {
          item.jobs.forEach((job) => {
            jobsSearch.push(job);
          });
        }
      });

      if (jobsSearch) {
        this.setState({ jobs: jobsSearch });
      } else {
        this.setState({ jobs: [] });
      }
    } else {
      this.setState({ jobs });
    }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 300);
  }

  onChangeInput = (e, key) => {
    const { form } = this.state;
    const clon = { ...form };
    const { value } = e.target;
    clon[key] = value;
    this.setState({ form: clon });

    setTimeout(() => {
      if (key === 'country') this.onChangeCountry(value);
      if (key === 'company') this.onChangeCompany(value);
    }, 100);
  }

  onChangeCountry(value) {
    const { form } = this.state;
    const { countries, jobs } = this.props;
    const clon = { ...form };
    clon.company = '';
    this.setState({ form: clon, loading: true });
    if (value !== '') {
      const country = countries.find((item) => (item.id === value));
      if (country) {
        this.setState({ jobs: country.jobs });
      } else {
        this.setState({ jobs: [] });
      }
    } else {
      this.setState({ jobs });
    }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 300);
  }

  onChangeCompany(value) {
    const { form } = this.state;
    const { companies, jobs } = this.props;
    const clon = { ...form };
    clon.country = '';
    this.setState({ form: clon, loading: true });

    if (value !== '') {
      const company = companies.find((item) => (item.id === value));
      if (company) {
        this.setState({ jobs: company.jobs });
      } else {
        this.setState({ jobs: [] });
      }
    } else {
      this.setState({ jobs });
    }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 300);
  }

  initData() {
    const { jobs } = this.props;
    this.setState({ jobs: jobs || [] });
  }

  render() {
    const { loading, jobs, form } = this.state;
    const { countries, companies } = this.props;

    return (
      <div className="shop" style={{ minHeight: '77vh', position: 'relative' }}>
        <section>
          <div className="container my-4">
            <div className="row">
              <div className="col-12 col-md-4 pt-4 mb-2">
                <Search
                  totalCount={0}
                  onKeyPressSearch={(e) => this.onKeyPressSearch(e)}
                  onChangeQuery={(e) => this.onChangeQuery(e)}
                  onResetSearchText={() => this.onResetSearchText()}
                />
              </div>
              <div className="col-12 col-md-8 pt-4 mb-2">
                <form autoComplete="off" className="mt-3">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <select
                          value={form.country}
                          onChange={(e) => this.onChangeInput(e, 'country')}
                          id="country"
                          className="form-control form-control-lg"
                          required
                        >
                          <option value="">Selecciona un País</option>
                          {!!countries.length && (countries.map((value) => (
                            <option value={value.id} key={value.id}>{value.name}</option>
                          )))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <select
                          value={form.company}
                          onChange={(e) => this.onChangeInput(e, 'company')}
                          id="company"
                          className="form-control form-control-lg"
                          required
                        >
                          <option value="">Selecciona una Compañía</option>
                          {!!companies.length && (companies.map((value) => (
                            <option value={value.id} key={value.id}>{value.name}</option>
                          )))}
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-12 py-3">
                <h5>
                  <b>Resultados</b>
                  {` (${jobs.length})`}
                </h5>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <List jobs={jobs} />
          </div>
        </section>
        {loading && (
          <div className="loaderCart">
            <span className="py-2">
              <Spinner size="lg" color="dark" className="mr-3" />
            </span>
          </div>
        )}
      </div>
    );
  }
}

Index.propTypes = propTypes;

const IndexW = LayoutWrapper(Index);

export default IndexW;
