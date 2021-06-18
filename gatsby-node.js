const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type contentfulPortfolioDescriptionTextNode implements Node {
      description: String
    }
    type ContentfulPortfolio implements Node {
      description: contentfulPortfolioDescriptionTextNode
      gallery: [ContentfulAsset]
      id: ID!
      name: String!
      related: [ContentfulPortfolio]
      slug: String!
      summary: String!
      thumbnail: ContentfulAsset
      url: String
    }
    type ContentfulMenuItem implements Node {
      id: ID!
      label: String!
      link: String!
    }
    type ContentfulConfig implements Node {
        id: ID!
        contentful_id: String!
        siteTitle: String!
        siteDescription: String!
        siteCover: ContentfulAsset
        menu: [ContentfulMenuItem]!
        socialFacebook: String!
        socialInstagram: String!
        socialPinterest: String!
        socialTwitter: String!
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        portfolio: allContentfulPortfolio {
          nodes {
            slug
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors)
      }

      if (data && data.portfolio) {
        const component = path.resolve("./src/templates/portfolio-item.jsx")
        data.portfolio.nodes.map(({ slug }) => {
          createPage({
            path: `/${slug}`,
            component,
            context: { slug },
          })
        })
      }

      resolve()
    })
  })
}
