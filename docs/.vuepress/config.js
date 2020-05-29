module.exports = {
  theme: "default-vue-a11y",
  title: "Eslint plugin vue.js accessibility",
  themeConfig: {
    home: false,
    repo: "vue-a11y/eslint-plugin-vuejs-accessibility",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: true,
    locales: {
      "/": {
        editLinkText: "Edit this page on GitHub",
        sidebar: [
          "/",
          {
            title: "Rules",
            collapsable: false,
            children: [
              "/rules/alt-text.md",
              "/rules/anchor-has-content.md",
              "/rules/accessible-emoji.md",
              "/rules/aria-props.md",
              "/rules/aria-role.md",
              "/rules/aria-unsupported-elements.md",
              "/rules/click-events-have-key-events.md",
              "/rules/form-control-has-label.md",
              "/rules/heading-has-content.md",
              "/rules/iframe-has-title.md",
              "/rules/interactive-supports-focus.md",
              "/rules/label-has-for.md",
              "/rules/media-has-caption.md",
              "/rules/mouse-events-have-key-events.md",
              "/rules/no-access-key.md",
              "/rules/no-autofocus.md",
              "/rules/no-distracting-elements.md",
              "/rules/no-onchange.md",
              "/rules/no-redundant-roles.md",
              "/rules/role-has-required-aria-props.md",
              "/rules/tabindex-no-positive.md"
            ]
          }
        ]
      }
    }
  }
};
