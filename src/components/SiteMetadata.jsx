import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

const METADATA_QUERY = graphql`
  query SiteMetadataQuery {
    config: contentfulConfig(contentful_id: { eq: "6uA5bWZ6fPHrB1pxJZpMkz" }) {
      siteTitle
      siteCover {
        localFile {
          publicURL
        }
      }
    }
  }
`

const SiteMetadata = ({ title, description, image }) => {
  const locale = "en"

  const { config } = useStaticQuery(METADATA_QUERY)

  if (!config) return null

  const { siteTitle, siteDescription, siteCover } = config

  return (
    <Helmet
      defer={false}
      defaultTitle={siteTitle}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
    >
      <html lang={locale} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description || siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteTitle} />
      <meta
        property="og:image"
        content={image || siteCover.localFile.publicURL}
      />
      <meta
        property="og:description"
        content={description || siteDescription}
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:image"
        content={image || siteCover.localFile.publicURL}
      />
    </Helmet>
  )
}

SiteMetadata.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default SiteMetadata
