import Typography from "typography"
import judahTheme from "typography-theme-judah"

judahTheme.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a, a:visited": {
      color: `rgb(35, 45, 182)`,
      textDecoration: `underline`,
    },
    "a:focus, a:hover, a:active": {
      color: `#000`,
      textDecoration: `underline`,
    }
  }
}

delete judahTheme.googleFonts

const typography = new Typography(judahTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
