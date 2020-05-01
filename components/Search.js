import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onKeyPressSearch: PropTypes.func.isRequired,
  onChangeQuery: PropTypes.func.isRequired,
  onResetSearchText: PropTypes.func.isRequired,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  onKeyPressSearch = (e) => {
    const { onKeyPressSearch } = this.props;
    onKeyPressSearch(e);
  }

  onChangeQuery = (e) => {
    const { onChangeQuery } = this.props;
    const search = e.target.value;
    this.setState({ search });
    onChangeQuery(e);
  }

  onResetSearchText = () => {
    const { onResetSearchText } = this.props;
    this.setState({ search: '' });
    onResetSearchText();
  }

  render() {
    const { search } = this.state;

    return (
      <div className="my-3">
        <form autoComplete="off" className="pb-2">
          <div className="search-input">
            <input
              value={search}
              onKeyPress={(e) => this.onKeyPressSearch(e)}
              onChange={(e) => this.onChangeQuery(e)}
              className="form-control form-control-lg"
              type="text"
              placeholder="Buscar trabajos"
            />
            <i className="fa fa-search" />
            <button
              type="button"
              className={!search ? 'close-icon close-icon__hide' : 'close-icon'}
              onClick={() => this.onResetSearchText()}
            >
              <i className="fa fa-close" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Search.propTypes = propTypes;

export default Search;
