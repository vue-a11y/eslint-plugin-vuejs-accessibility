import { defineConfig } from "vitepress";
import { rules } from "./rulesForSidebar";
import { description, version } from "../../package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "eslint-plugin-vuejs-a11y",
  base: "/eslint-plugin-vuejs-accessibility/",
  description,
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "https://vue-a11y.com/favicon/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "https://vue-a11y.com/favicon/favicon-96x96.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "https://vue-a11y.com/favicon/favicon-16x16.png"
      }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: version,
        items: [
          {
            text: "Changelog",
            link: "https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/CHANGELOG.md"
          }
        ]
      }
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/" },
          { text: "Rule Overview", link: "/rule-overview/index" }
        ]
      },
      {
        text: "Rules",
        items: rules
      }
    ],

    editLink: {
      pattern:
        "https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/edit/main/docs/:path"
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility"
      }
    ],

    search: {
      provider: "local"
    }
  }
});
