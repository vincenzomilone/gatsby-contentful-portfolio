import { graphql } from "gatsby"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Img from "gatsby-image"
import React from "react"
import SiteMetadata from "../components/SiteMetadata"
import Button from "../components/Button"
import Cards from "../components/Cards"
import Carousel from "../components/Carousel"
import Newsletter from "../components/Newsletter"
import Layout from "../layouts/Layout"

export default props => {
  const {
    description,
    gallery,
    name,
    related,
    summary,
    thumbnail,
    url,
    bodyRichText,
  } = props.data.item

  return (
    <Layout>
      <SiteMetadata
        title={name}
        description={summary}
        image={thumbnail.localFile.publicURL}
      />
      <div className="bg-gray-0 py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-2/3 pb-8">
              {gallery && gallery.length === 1 && (
                <Img
                  fluid={gallery[0].localFile.childImageSharp.fluid}
                  alt={name}
                />
              )}
              {gallery && gallery.length > 1 && <Carousel images={gallery} />}
            </div>
            <div className="w-full lg:w-1/3 lg:pl-8 xl:pl-12">
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-1">
                {name}
              </h1>
              <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-600 sm:text-2xl">
                {summary}
              </h2>
              {description && (
                <div className="my-4 text-base text-gray-700 whitespace-pre-line">
                  {description.description}
                </div>
              )}
              {url && (
                <div className="mt-8">
                  <Button href={url}>More info</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {bodyRichText && (
        <div className="container">
          <div className="content my-4 text-base text-gray-700 whitespace-pre-line">
            {documentToReactComponents(bodyRichText.json, {
              renderNode: {
                [BLOCKS.HEADING_1]: (node, children) => (
                  <h1 className="text-4xl font-extrabold mb-4">{children}</h1>
                ),
                [BLOCKS.HEADING_2]: (node, children) => (
                  <h2 className="text-3xl font-extrabold mb-4">{children}</h2>
                ),
                [BLOCKS.HEADING_3]: (node, children) => (
                  <h2 className="text-2xl font-extrabold mb-4">{children}</h2>
                ),
                [BLOCKS.EMBEDDED_ASSET]: node => (
                  <div className="flex items-center mb-8">
                    {node.data.target.fields && (
                      <img
                        className="mx-auto"
                        src={node.data.target.fields.file["en-US"].url}
                        alt={node.data.target.fields.title["en-US"]}
                      />
                    )}
                  </div>
                ),
              },
            })}
          </div>
        </div>
      )}
      {related && (
        <div className="bg-gray-100 py-12 lg:py-16">
          <div className="container">
            <h2 className="text-3xl sm:text-4xl leading-tight font-extrabold tracking-tight text-gray-900 mb-8">
              You may also like
            </h2>
          </div>
          <Cards items={related} hideLastItemOnMobile={true} />
        </div>
      )}
      <Newsletter />
    </Layout>
  )
}

export const query = graphql`
  query PortfolioItemQUery($slug: String!) {
    item: contentfulPortfolio(slug: { eq: $slug }) {
      description {
        description
      }
      gallery {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 960, quality: 85) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        title
      }
      name
      related {
        ...PortfolioCard
      }
      summary
      thumbnail {
        localFile {
          publicURL
        }
      }
      url
      bodyRichText {
        json
      }
    }
  }
`
