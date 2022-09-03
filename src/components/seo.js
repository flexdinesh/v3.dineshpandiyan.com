import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title, canonicalURL: canonical }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`${data.site.siteMetadata.fullName} | %s`}
            link={
              canonical
                ? [{ rel: 'canonical', key: canonical, href: canonical }]
                : []
            }
            meta={[
              // Because this is an archived website
              {
                name: `robots`,
                content: 'noindex,nofollow',
              },           
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `og:image`,
                content: data.allFile.edges[0].node.childImageSharp.resize.src,
              },
              {
                name: `google-site-verification`,
                content: 'lpiCbxqS9teGY6OaEiSz8PQFGmf52vwkQGss2PufUGI',
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        fullName
      }
    }
    allFile(
      filter: { sourceInstanceName: { eq: "images" }, name: { eq: "dp" } }
    ) {
      edges {
        node {
          name
          extension
          relativePath
          publicURL
          childImageSharp {
            resize {
              width
              height
              aspectRatio
              originalName
              src
            }
          }
        }
      }
    }
  }
`
