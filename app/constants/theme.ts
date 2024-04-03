import { ThemeConfig } from "antd";

export const AppTheme: ThemeConfig = {
  token: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    Layout: {
      siderBg: "#FEFEFF",
      bodyBg: "#FEFEFF",
      headerPadding: 5,
      headerBg: "#FEFEFF",
      footerBg: "#FEFEFF",
    },
    Menu: {
      colorBgContainer: "#FEFEFF",
      colorBgBase: "#FEFEFF",
      itemColor: "#00000",
      iconSize: 20,
      itemActiveBg: "rgba(0, 0, 0, 0.06)",
      itemSelectedBg: "#0038ff",
      itemSelectedColor: "#FEFEFF",
      itemMarginInline: 20,
    },
    Button: {
      defaultBg: "#0038ff",
      defaultHoverBorderColor: "#0038ff",
      defaultHoverColor: "#0038ff",
      defaultColor: "#fefeff",
    },
  },
};
