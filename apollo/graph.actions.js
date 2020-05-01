import gql from 'graphql-tag';

export const jobs = gql`
  query jobs {
    jobs {
      id
      title
      slug
      locationNames
      createdAt
      cities {
        id
        name
        country {
          name
        }
      }
      company {
        id
        name
        logoUrl
        websiteUrl
      }
      tags {
        id
        name
      }
    }
  }
`;

export const countries = gql`
  query countries ($search: String){
    countries {
      id
      name
      slug
      isoCode
      jobs(orderBy: createdAt_ASC, where: {slug_contains: $search} ){
        id
        title
        slug
        locationNames
        createdAt
        cities {
          id
          name
          country {
            name
          }
        }
        company {
          id
          name
          logoUrl
          websiteUrl
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

export const companies = gql`
  query companies ($search: String){
    companies{
      id
      name
      slug
      websiteUrl
      logoUrl
      jobs(orderBy: createdAt_ASC, where: {slug_contains: $search}){
        id
        title
        slug
        locationNames
        createdAt
        cities {
          id
          name
          country {
            name
          }
        }
        company {
          id
          name
          logoUrl
          websiteUrl
        }
        tags {
          id
          name
        }
      }
    }
  }
`;
