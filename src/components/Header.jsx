import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import MenuMobile from "./MenuMobile"
import { FaBars } from "react-icons/fa"

const HEADER_QUERY = graphql`
  query HeaderQuery {
    config: contentfulConfig(contentful_id: { eq: "6uA5bWZ6fPHrB1pxJZpMkz" }) {
      menu {
        id
        label
        link
      }
    }
  }
`

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const {
    config: { menu },
  } = useStaticQuery(HEADER_QUERY)

  return (
    <div className="container pt-6 pb-12 md:pt-12">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            alt="Logo"
            className="w-64"
            src="https://s20631.pcdn.co/wp-content/uploads/2017/06/Florence-Logo-300-v2.png"
          />
        </Link>

        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <FaBars className="h-6 w-auto text-gray-900 fill-current -mt-1" />
        </button>

        <div className="hidden sm:block">
          {/* {site.data.menu.map((link, key) => (
            <Link
              key={`menu_desktop_link${key}`}
              className="ml-6 sm:ml-8 text-sm sm:text-base font-medium px-px border-b-2 pb-2 border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-200 transition duration-150 ease-in-out"
              activeClassName="border-blue-600 text-gray-900 hover:border-blue-600"
              to={link.to}
            >
              {link.name}
            </Link>
          ))} */}
          {menu
            ? menu.map(item => (
                <Link
                  key={item.id}
                  className="ml-6 sm:ml-8 text-sm sm:text-base font-medium px-px border-b-2 pb-2 border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-200 transition duration-150 ease-in-out"
                  activeClassName="border-blue-600 text-gray-900 hover:border-blue-600"
                  to={item.link}
                >
                  {item.label}
                </Link>
              ))
            : null}
        </div>
      </div>
      <MenuMobile isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} links={menu} />
    </div>
  )
}

export default Header
