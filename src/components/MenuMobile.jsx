import { Link } from "gatsby"
import { motion } from "framer-motion"
import PropTypes from "prop-types"
import React from "react"
import Overlay from "./Overlay"

const menuItem = {
  closed: {
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0,
    },
    x: -20,
  },
  open: key => ({
    opacity: 1,
    transition: {
      delay: 0.25 + key * 0.1,
      type: "tween",
    },
    x: 0,
  }),
}

const MenuMobile = ({ links, isOpen, setIsOpen }) => {
  return (
    <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="container flex flex-col justify-center">
        <ul className="text-center">
          {links.map(link => (
            <motion.li
              className="my-3"
              animate={isOpen ? "open" : "closed"}
              custom={link.id}
              key={`menu_mobile_link_${link.id}`}
              variants={menuItem}
            >
              <Link
                className="font-semibold text-4xl text-white"
                activeClassName="text-blue-500"
                to={link.link}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </Overlay>
  )
}

MenuMobile.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default MenuMobile
