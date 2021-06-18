import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa"

const FOOTER_QUERY = graphql`
  query FooterQuery {
    socials: contentfulConfig(contentful_id: { eq: "6uA5bWZ6fPHrB1pxJZpMkz" }) {
      facebook: socialFacebook
      instagram: socialInstagram
      pinterest: socialPinterest
      twitter: socialTwitter
    }
  }
`

const Footer = () => {
  const { socials } = useStaticQuery(FOOTER_QUERY)

  return (
    <div className="container py-12 md:flex md:items-center md:justify-between">
      {socials && (
        <ul className="flex justify-center md:order-2">
          {socials.twitter && (
            <FooterLink
              href={socials.twitter}
              icon={FaTwitter}
              label="Twitter"
            />
          )}
          {socials.facebook && (
            <FooterLink
              href={socials.facebook}
              icon={FaFacebook}
              label="Facebook"
            />
          )}
          {socials.instagram && (
            <FooterLink
              href={socials.instagram}
              icon={FaInstagram}
              label="Instagram"
            />
          )}
          {socials.pinterest && (
            <FooterLink
              href={socials.pinterest}
              icon={FaPinterest}
              label="Pinterest"
            />
          )}
        </ul>
      )}
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-sm md:text-base text-gray-700">
          &copy; 2020-{new Date().getFullYear()} Florence Consulting Group. All
          rights reserved.
        </p>
      </div>
    </div>
  )
}

const FooterLink = ({ href, label, icon: Icon }) => {
  return (
    <li className="inline-block pl-6">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out"
      >
        <span className="sr-only">{label}</span>
        <Icon className="w-5 h-5 fill-current" />
      </a>
    </li>
  )
}

export default Footer
