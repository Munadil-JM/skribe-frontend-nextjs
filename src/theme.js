// src/theme.js
import { extendTheme } from "@chakra-ui/react";

// Example of extending the Chakra UI theme
const theme = extendTheme({
  // Customize global styles (e.g., fonts, colors, etc.)
  styles: {
    global: {
      body: {
        bg: "gray.100", // Background color for the body
        color: "gray.800", // Text color
      },
    },
  },
  // Customize the theme colors
  colors: {
    primary: "#FF6347", // Example custom primary color
  },
  // Customize fonts
  fonts: {
    heading: "Arial, sans-serif", // Heading font
    body: "Roboto, sans-serif", // Body font
  },
  // Customize components (e.g., Button, Input, etc.)
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold", // Make button text bold
        textTransform: "uppercase", // Uppercase text in buttons
      },
      sizes: {
        lg: {
          fontSize: "lg",
          padding: "8px 16px",
        },
      },
      variants: {
        solid: {
          bg: "primary", // Button background color
          color: "white",
          _hover: {
            bg: "red.500", // Button hover color
          },
        },
      },
    },
  },
});

export default theme;
