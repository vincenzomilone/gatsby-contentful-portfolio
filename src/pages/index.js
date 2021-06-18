import { graphql } from "gatsby"
import React from "react"
import Cards from "../components/Cards"
import Hero from "../components/Hero"
import Layout from "../layouts/Layout"
import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  const { config } = data
  return (
    <Layout>
      {config && (
        <SiteMetadata
          title={config.siteTitle}
          description={config.siteDescription}
        />
      )}

      <div className="bg-gray-100 py-12 lg:py-16">
        {data.portfolio && data.portfolio.nodes.length > 0 ? (
          <Cards items={data.portfolio.nodes} />
        ) : (
          <div className="container">No projects found.</div>
        )}
      </div>
      <Newsletter />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    portfolio: allContentfulPortfolio {
      nodes {
        ...PortfolioCard
      }
    }
    config: contentfulConfig(contentful_id: { eq: "6uA5bWZ6fPHrB1pxJZpMkz" }) {
      siteTitle
      siteDescription
      socialFacebook
      socialInstagram
      socialPinterest
      socialTwitter
    }
  }
`
