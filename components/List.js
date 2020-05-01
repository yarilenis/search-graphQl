import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  jobs: PropTypes.array.isRequired,
};

function List({ jobs }) {
  return (
    <div className="row">
      {!!jobs.length && jobs.map((job) => (
        <div key={job.id} className="col-12 bg-light list shadow">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>{job.title}</h3>
              <h5>{job.company.name}</h5>
            </div>

            <div className="col-6 col-md-4 list__tags">
              {job.tags && job.tags.map((tag, i) => (
                i < 3 && (
                  <div
                    key={tag.id}
                    className="border border-dark rounded p-2 m-1"
                  >
                    {tag.name}
                  </div>
                )
              ))}
            </div>
            <div className="col-6 col-md-2 list__cities">
              {job.cities && job.cities.map((city) => (
                <p key={city.id}>
                  {`${city.country.name}, ${city.name}`}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

List.propTypes = propTypes;

export default List;
