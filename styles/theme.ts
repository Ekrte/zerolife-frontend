// theme.ts
import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
	colors: {
		white: "#FFFFFF",
		background: "#1B1A1F",
		gray2: "#FBFAFF",
		gray5: "#F1F0F7",
		gray10: "#EcE1EB",
		gray20: "#CAC9D1",
		gray30: "#B2B1BA",
		gray40: "#9A98A3",
		gray50: "#817F8A",
		gray60: "#676570",
		gray70: "#4D4C54",
		gray80: "#323138",
		gray90: "#1B1A1F",
		primary: "#7E9AFC",
		primary10: "#5061FA",
		primary20: "#3342C9",
		primary30: "#1E266B",
		primary40: "#151D47",
		secondary: "#FFED8C",
		secondary10: "#FFCD4E",
		secondary20: "#FFA63D",
		alert: "#F74857",
		green: {
			tintLight: "#F6FFED",
			tintDark: "#A6E47A",
			full: "#52C41A",
			shadeLight: "#237804",
			shadeDark: "#092B00",
		},
		red: {
			solar: "#F74857",
			required: "#F31818",
			tintLight: "#FFF1F0",
			tintDark: "#FF8E8A",
			full: "#DD1D1D",
			shadeLight: "#A8071A",
			shadeDark: "#5C0011",
		},
		orange: {
			tintLight: "#FFF7E6",
			tintDark: "#FFCB7D",
			full: "#FA8C16",
			shadeLight: "#AD4E00",
			shadeDark: "#612500",
		},
		yellow: {
			tintLight: "#FEFFE6",
			tintDark: "#FFF87B",
			full: "#FADB14",
			shadeLight: "#AD8B00",
			shadeDark: "#614700",
		},
		teal: {
			tintLight: "#E6FFFB",
			tintDark: "#72E2D9",
			full: "#13C2C2",
			shadeLight: "#006D75",
			shadeDark: "#002329",
		},
		blue: {
			tintLight: "#E6F7FF",
			tintDark: "#7DCBFF",
			full: "#1890FF",
			shadeLight: "#0050B3",
			shadeDark: "#002766",
		}
	},
	fonts: {
		pageHeading: "32px",
		heading: "20px",
		subHeading: "16px",
		body: "14px",
		caption: "12px",
	},
};
