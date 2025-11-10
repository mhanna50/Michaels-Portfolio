// src/hooks/useWeatherTheme.js
import { useEffect, useState } from "react";

const MAIN_THEME = {
  accent: "#F6F8F6",
  text: "#F6F8F6",
  page: {
    bg: "linear-gradient(180deg, #020202 0%, #060606 55%, #090909 100%)",
    text: "#F6F8F6",
  },
  hero: {
    bg: "#E7E9EC",
    text: "#121415",
  },
  footer: {
    bg: "linear-gradient(135deg, #030303 0%, #080808 100%)",
    text: "#E5F0E8",
  },
  sections: {
    about: {
      bg: "linear-gradient(135deg, #040404 0%, #0C0C0C 100%)",
      text: "#F6F8F6",
      palette: {
        heading: "#F9FBF9",
        accent: "#F6F8F6",
        muted: "#D3DDD7",
        divider: "rgba(67, 104, 80, 0.6)",
        card: {
          bg: "rgba(8, 8, 8, 0.92)",
          border: "rgba(67, 104, 80, 0.5)",
          text: "#F6F8F6",
          muted: "#D5DFDA",
        },
        cardAlt: {
          bg: "rgba(12, 12, 12, 0.9)",
          border: "rgba(67, 104, 80, 0.42)",
          text: "#F6F8F6",
          muted: "#CBD6D0",
        },
      },
    },
    portfolio: {
      bg: "linear-gradient(135deg, #030303 0%, #090909 70%, #050505 100%)",
      text: "#F6F8F6",
      palette: {
        overlay: "radial-gradient(circle at top, rgba(67,104,80,0.14), transparent 65%)",
        heading: "#F9FBF9",
        accent: "#F6F8F6",
        muted: "#CED8D2",
        divider: "rgba(67, 104, 80, 0.58)",
        card: {
          bg: "rgba(7, 7, 7, 0.94)",
          border: "rgba(67, 104, 80, 0.55)",
          text: "#F6F8F6",
          muted: "#D4DDD8",
        },
        cardAlt: {
          bg: "rgba(10, 10, 10, 0.9)",
          border: "rgba(67, 104, 80, 0.45)",
          text: "#F6F8F6",
          muted: "#CBD6D0",
        },
        featureCard: {
          bg: "rgba(9, 9, 9, 0.92)",
          border: "rgba(67, 104, 80, 0.56)",
          text: "#F6F8F6",
          muted: "#DAE3DE",
        },
        projectCard: {
          bg: "rgba(6, 6, 6, 0.92)",
          border: "rgba(67, 104, 80, 0.52)",
          text: "#F6F8F6",
          muted: "#CFD9D3",
          mediaBg: "linear-gradient(135deg, rgba(67, 104, 80, 0.55), rgba(10, 12, 11, 0.85))",
        },
        button: {
          bg: "#436850",
          text: "#F6F8F6",
          hover: "#2C4739",
        },
        deepDive: {
          bg: "rgba(5, 5, 5, 0.9)",
          border: "rgba(67, 104, 80, 0.4)",
          text: "#F6F8F6",
          accent: "#E6F2EA",
          tabs: {
            bg: "rgba(8, 8, 8, 0.78)",
            border: "rgba(67, 104, 80, 0.32)",
            text: "#DAE6E0",
            activeBg: "#436850",
            activeText: "#F6F8F6",
            activeBorder: "#436850",
          },
        },
      },
    },
    certifications: {
      bg: "linear-gradient(135deg, #040404 0%, #0A0A0A 60%, #050505 100%)",
      text: "#F6F8F6",
      palette: {
        heading: "#F9FBF9",
        accent: "#F6F8F6",
        muted: "#D1DCD6",
        divider: "rgba(67, 104, 80, 0.55)",
        card: {
          bg: "rgba(11, 11, 11, 0.92)",
          border: "rgba(67, 104, 80, 0.45)",
          text: "#F6F8F6",
          muted: "#D8E2DC",
        },
        cardAlt: {
          bg: "rgba(9, 9, 9, 0.9)",
          border: "rgba(67, 104, 80, 0.4)",
          text: "#F6F8F6",
        },
        skillDeck: {
          labelBg: "rgba(67, 104, 80, 0.32)",
          labelText: "#F6F8F6",
          sublabelText: "#CEDAD4",
          countText: "#CEDAD4",
          groupBadgeBg: "rgba(67, 104, 80, 0.28)",
          groupBadgeText: "#E6F2EA",
          groupBadgeBorder: "rgba(67, 104, 80, 0.38)",
          itemBg: "rgba(8, 8, 8, 0.9)",
          itemBorder: "rgba(67, 104, 80, 0.4)",
          itemText: "#F6F8F6",
          tagBg: "rgba(67, 104, 80, 0.3)",
          tagBorder: "rgba(67, 104, 80, 0.42)",
          tagText: "#F6F8F6",
        },
      },
    },
    contact: {
      bg: "linear-gradient(135deg, #040404 0%, #090909 100%)",
      text: "#F6F8F6",
      buttonContrast: "#F6F8F6",
      palette: {
        heading: "#F9FBF9",
        body: "#D3DDD7",
        muted: "#CBD6D0",
        divider: "rgba(67, 104, 80, 0.42)",
        buttonBg: "#436850",
        buttonText: "#F6F8F6",
        buttonHover: "#2C4739",
        card: {
          bg: "rgba(3, 3, 3, 0.92)",
          border: "rgba(67, 104, 80, 0.36)",
          text: "#F6F8F6",
          subtext: "#CBD6D0",
          bullet: "rgba(230, 242, 234, 0.75)",
          icon: "#E6F2EA",
          shadow: "0 18px 60px rgba(6, 10, 8, 0.35)",
        },
      },
    },
  },
  blog: {
    bg: "linear-gradient(135deg, #050505 0%, #090909 100%)",
    text: "#F6F8F6",
    cardBg: "rgba(8, 8, 8, 0.9)",
    cardText: "#F6F8F6",
    listBg: "rgba(6, 6, 6, 0.9)",
    palette: {
      nav: "#E6F2EA",
      navMuted: "#A6B9AF",
      heading: "#F9FBF9",
      body: "#E9F3ED",
      muted: "#C8D4CD",
      divider: "rgba(67, 104, 80, 0.5)",
      date: "#D2DED6",
      cardBorder: "rgba(67, 104, 80, 0.5)",
      buttonBg: "#436850",
      buttonText: "#F6F8F6",
      buttonHover: "#2C4739",
      pillBorder: "rgba(67, 104, 80, 0.5)",
    },
  },
};

const THEMES = {
  main: MAIN_THEME,
  clear: {
    accent: "#8F7A63",
    text: "#2F2A24",
    sections: {
      about: {
        bg: "linear-gradient(135deg, #f6f1e8 0%, #e2d4c0 100%)",
        text: "#2F2A24",
        palette: {
          heading: "#3A3127",
          accent: "#A38863",
          muted: "#6D5D4B",
          divider: "#C9B597",
          card: {
            bg: "rgba(255,250,242,0.95)",
            border: "#E3D5C2",
            text: "#372D23",
            muted: "#6F5E4A",
          },
          cardAlt: {
            bg: "rgba(249,239,226,0.92)",
            border: "#D9C8B3",
            text: "#372D23",
            muted: "#6D5D4B",
          },
        },
      },
      portfolio: {
        bg: "linear-gradient(135deg, #f2e8da 0%, #d9c8b3 100%)",
        text: "#2F2A24",
        palette: {
          heading: "#3A3127",
          accent: "#A38863",
          muted: "#6B5A47",
          divider: "#C1B09A",
          card: {
            bg: "rgba(253,247,236,0.94)",
            border: "#E0D0BC",
            text: "#352C23",
            muted: "#675947",
          },
          featureCard: {
            bg: "rgba(248,240,228,0.94)",
            border: "#D4C3AE",
            text: "#32291F",
          },
          projectCard: {
            bg: "rgba(255,247,233,0.94)",
            border: "#E3D2BD",
            text: "#32291F",
            muted: "#625340",
          },
          button: {
            bg: "#8F7A63",
            text: "#FDF8EF",
            hover: "#75634D",
          },
        },
      },
      certifications: {
        bg: "linear-gradient(135deg, #f4ebdd 0%, #decdb7 100%)",
        text: "#2F2A24",
        palette: {
          heading: "#3B3228",
          accent: "#A38863",
          muted: "#6D5C48",
          divider: "#C7B398",
          card: {
            bg: "rgba(255,245,231,0.94)",
            border: "#E1D0BA",
            text: "#352C23",
            muted: "#6A5844",
          },
          cardAlt: {
            bg: "rgba(250,237,221,0.92)",
            border: "#D7C4AD",
            text: "#352C23",
          },
          skillDeck: {
            labelBg: "rgba(163, 136, 99, 0.2)",
            labelText: "#A38863",
            sublabelText: "#6F5E4A",
            countText: "#6F5E4A",
            groupBadgeBg: "rgba(163, 136, 99, 0.18)",
            groupBadgeText: "#A38863",
            groupBadgeBorder: "rgba(163, 136, 99, 0.32)",
            itemBg: "rgba(253, 247, 236, 0.9)",
            itemBorder: "rgba(195, 176, 149, 0.45)",
            itemText: "#5F4E3D",
            tagBg: "rgba(163, 136, 99, 0.18)",
            tagBorder: "rgba(163, 136, 99, 0.35)",
            tagText: "#3B3228",
          },
        },
      },
      skills: {
        bg: "linear-gradient(135deg, #f7f1e6 0%, #e2d5c1 100%)",
        text: "#2F2A24",
        palette: {
          heading: "#3A3127",
          accent: "#A38863",
          muted: "#6B5A47",
          divider: "#C9B597",
          badges: {
            languages: { gradient: ["#F1E7D6", "#DBCBB6"], text: "#32291F" },
            frameworks: { gradient: ["#EADCC6", "#D4C3AE"], text: "#32291F" },
            tools: { gradient: ["#E2D2BC", "#CBB79F"], text: "#32291F" },
            other: { gradient: ["#F5EDDF", "#DECDB7"], text: "#32291F" },
          },
        },
      },
      contact: {
        bg: "linear-gradient(135deg, #cdbba5 0%, #a48f7a 100%)",
        text: "#F6F0E7",
        buttonContrast: "#2F2A24",
        palette: {
          heading: "#FDF7EE",
          body: "#F1E4D3",
          muted: "#E5D4C0",
          divider: "rgba(253,247,238,0.25)",
          buttonBg: "#F6E7D1",
          buttonText: "#5F4C38",
          buttonHover: "#E3CDB3",
          card: {
            bg: "rgba(255, 247, 236, 0.92)",
            border: "rgba(195, 176, 149, 0.45)",
            text: "#3A2F24",
            subtext: "#6F5D4A",
            bullet: "rgba(163, 136, 99, 0.45)",
            icon: "#A38863",
            shadow: "0 18px 48px rgba(119, 101, 82, 0.25)",
          },
        },
      },
    },
    footer: {
      bg: "linear-gradient(135deg, #8b7762 0%, #6b5a48 100%)",
      text: "#F6F0E7",
    },
    blog: {
      bg: "linear-gradient(135deg, #f5ecde 0%, #e0cfba 100%)",
      text: "#2F2A24",
      cardBg: "rgba(253,246,235,0.92)",
      cardText: "#2F2A24",
      listBg: "linear-gradient(135deg, rgba(245,236,222,0.9) 0%, rgba(224,207,186,0.6) 100%)",
      palette: {
        nav: "#6D5B47",
        navMuted: "#8D7862",
        heading: "#3B3228",
        body: "#42352A",
        muted: "#6D5B47",
        divider: "#C5B197",
        date: "#A38863",
        cardBorder: "#E0D0BC",
        buttonBg: "#8F7A63",
        buttonText: "#FDF8EF",
        buttonHover: "#75634D",
        pillBorder: "rgba(143,122,99,0.35)",
      },
    },
  },
  clouds: {
    accent: "#7a8896",
    text: "#1f2730",
    sections: {
      about: {
        bg: "linear-gradient(135deg, #e6eaef 0%, #d7dde3 100%)",
        text: "#1f2730",
        palette: {
          heading: "#2B3440",
          accent: "#6D7A88",
          muted: "#58626C",
          divider: "#AAB4C1",
          card: {
            bg: "rgba(236,240,245,0.95)",
            border: "#C9D1DA",
            text: "#24303A",
            muted: "#58626C",
          },
          cardAlt: {
            bg: "rgba(228,233,240,0.92)",
            border: "#BFC8D3",
            text: "#24303A",
            muted: "#58626C",
          },
        },
      },
      portfolio: {
        bg: "linear-gradient(135deg, #dfe4ea 0%, #cbd2d9 100%)",
        text: "#1f2730",
        palette: {
          heading: "#2B3440",
          accent: "#718093",
          muted: "#5B6774",
          divider: "#A8B3C1",
          card: {
            bg: "rgba(234,238,243,0.94)",
            border: "#C6CED7",
            text: "#24303A",
            muted: "#5B6774",
          },
          featureCard: {
            bg: "rgba(228,233,240,0.94)",
            border: "#BAC4CF",
            text: "#1F2933",
          },
          projectCard: {
            bg: "rgba(237,241,245,0.94)",
            border: "#C2CBD5",
            text: "#1F2933",
            muted: "#56616C",
          },
          button: {
            bg: "#6F8093",
            text: "#F6FAFF",
            hover: "#556577",
          },
        },
      },
      certifications: {
        bg: "linear-gradient(135deg, #e5eaef 0%, #d1d7dd 100%)",
        text: "#1f2730",
        palette: {
          heading: "#2B3440",
          accent: "#6F7C8A",
          muted: "#5A6571",
          divider: "#9FABB9",
          card: {
            bg: "rgba(237,241,245,0.95)",
            border: "#C5CED8",
            text: "#22303A",
            muted: "#58626C",
          },
        cardAlt: {
          bg: "rgba(229,235,240,0.92)",
          border: "#B9C3CF",
          text: "#22303A",
        },
        skillDeck: {
          labelBg: "rgba(111, 128, 147, 0.18)",
          labelText: "#6F8093",
          sublabelText: "#5B6774",
          countText: "#5B6774",
          groupBadgeBg: "rgba(164, 173, 186, 0.2)",
          groupBadgeText: "#6D7A88",
          groupBadgeBorder: "rgba(170, 180, 193, 0.28)",
          itemBg: "rgba(234, 238, 243, 0.88)",
          itemBorder: "rgba(170, 180, 193, 0.35)",
          itemText: "#58626C",
          tagBg: "rgba(164, 173, 186, 0.22)",
          tagBorder: "rgba(170, 180, 193, 0.4)",
          tagText: "#2B3440",
        },
      },
    },
      skills: {
        bg: "linear-gradient(135deg, #E9EDF2 0%, #CED5DE 100%)",
        text: "#1f2730",
        palette: {
          heading: "#2B3440",
          accent: "#6D7A88",
          muted: "#58626C",
          divider: "#AAB4C1",
          badges: {
            languages: { gradient: ["#D9E0EA", "#C2CBD8"], text: "#24313F" },
            frameworks: { gradient: ["#D2DAE5", "#BBC5D1"], text: "#24313F" },
            tools: { gradient: ["#CBD4E0", "#B4BECB"], text: "#24313F" },
            other: { gradient: ["#E1E6ED", "#CED5DE"], text: "#24313F" },
          },
        },
      },
      contact: {
        bg: "linear-gradient(135deg, #8b97a2 0%, #707a86 100%)",
        text: "#f8fafc",
        buttonContrast: "#f8fafc",
        palette: {
          heading: "#F5FAFF",
          body: "#E5ECF4",
          muted: "#D4DEE9",
          divider: "rgba(245,250,255,0.2)",
          buttonBg: "#F5FAFF",
          buttonText: "#576675",
          buttonHover: "#D8E3F0",
          card: {
            bg: "rgba(235, 239, 244, 0.94)",
            border: "rgba(170, 180, 193, 0.4)",
            text: "#1F2933",
            subtext: "#5A6571",
            bullet: "rgba(111, 128, 147, 0.45)",
            icon: "#6F8093",
            shadow: "0 18px 48px rgba(81, 96, 113, 0.18)",
          },
        },
      },
    },
    footer: {
      bg: "linear-gradient(135deg, #6C7886 0%, #4A5563 100%)",
      text: "#F5FAFF",
    },
    blog: {
      bg: "linear-gradient(135deg, #e4e8ed 0%, #cfd5dc 100%)",
      text: "#1f2730",
      cardBg: "rgba(245,247,250,0.92)",
      cardText: "#1f2730",
      listBg: "linear-gradient(135deg, rgba(228,232,237,0.9) 0%, rgba(207,213,220,0.6) 100%)",
      palette: {
        nav: "#516071",
        navMuted: "#7A8999",
        heading: "#2B3440",
        body: "#2C3743",
        muted: "#5D6A78",
        divider: "#9FABB9",
        date: "#6F8093",
        cardBorder: "#C3CCD6",
        buttonBg: "#6F8093",
        buttonText: "#F6FAFF",
        buttonHover: "#56667A",
        pillBorder: "rgba(111,128,147,0.35)",
      },
    },
  },
  rain: {
    accent: "#6D8F81",
    text: "#1F2C33",
    sections: {
      about: {
        bg: "linear-gradient(135deg, #e2edf4 0%, #c6dce7 100%)",
        text: "#1F2C33",
        palette: {
          heading: "#1D2F36",
          accent: "#5F8F99",
          muted: "#446066",
          divider: "#8DB3BA",
          card: {
            bg: "rgba(225,236,241,0.94)",
            border: "#B6CFD7",
            text: "#1D2F36",
            muted: "#446066",
          },
          cardAlt: {
            bg: "rgba(218,232,238,0.92)",
            border: "#ABC7CF",
            text: "#1D2F36",
          },
        },
      },
      portfolio: {
        bg: "linear-gradient(135deg, #d7e6ef 0%, #bdd5e2 100%)",
        text: "#1F2C33",
        palette: {
          heading: "#1D2F36",
          accent: "#5F8F99",
          muted: "#446066",
          divider: "#8CB2BA",
          card: {
            bg: "rgba(220,234,240,0.94)",
            border: "#B3CAD2",
            text: "#1D2F36",
            muted: "#3F5A60",
          },
          featureCard: {
            bg: "rgba(214,229,236,0.94)",
            border: "#A8C1CA",
            text: "#1A2B31",
          },
          projectCard: {
            bg: "rgba(224,236,241,0.94)",
            border: "#B6CFD7",
            text: "#1A2B31",
            muted: "#3F5A60",
          },
          button: {
            bg: "#4F6F63",
            text: "#F4F7F5",
            hover: "#3C554B",
          },
        },
      },
      certifications: {
        bg: "linear-gradient(135deg, #deeaf2 0%, #c2d8e4 100%)",
        text: "#1F2C33",
        palette: {
          heading: "#1D2F36",
          accent: "#5F8F99",
          muted: "#446066",
          divider: "#88AEBA",
          card: {
            bg: "rgba(222,235,242,0.94)",
            border: "#B2CBD5",
            text: "#1C2D33",
            muted: "#3F5A60",
          },
        cardAlt: {
          bg: "rgba(215,229,237,0.92)",
          border: "#A9C3CD",
          text: "#1C2D33",
        },
        skillDeck: {
          labelBg: "rgba(95, 143, 153, 0.2)",
          labelText: "#5F8F99",
          sublabelText: "#3F5A60",
          countText: "#3F5A60",
          groupBadgeBg: "rgba(95, 143, 153, 0.18)",
          groupBadgeText: "#5F8F99",
          groupBadgeBorder: "rgba(95, 143, 153, 0.28)",
          itemBg: "rgba(220, 234, 240, 0.88)",
          itemBorder: "rgba(95, 143, 153, 0.32)",
          itemText: "#3F5A60",
          tagBg: "rgba(95, 143, 153, 0.22)",
          tagBorder: "rgba(95, 143, 153, 0.35)",
          tagText: "#1D2F36",
        },
      },
    },
      skills: {
        bg: "linear-gradient(135deg, #DCE9F0 0%, #BCCFD9 100%)",
        text: "#1F2C33",
        palette: {
          heading: "#1D2F36",
          accent: "#5F8F99",
          muted: "#3F5A60",
          divider: "#8BB0BA",
          badges: {
            languages: { gradient: ["#CFE4EC", "#AFCFDB"], text: "#1D2F36" },
            frameworks: { gradient: ["#C6DEE8", "#A1C4D1"], text: "#1D2F36" },
            tools: { gradient: ["#BFD9E2", "#98C0CA"], text: "#1D2F36" },
            other: { gradient: ["#D6E8EE", "#B5CFD8"], text: "#1D2F36" },
          },
        },
      },
      contact: {
        bg: "linear-gradient(135deg, #cfe1e7 0%, #b2c9ce 100%)",
        text: "#1F2C33",
        buttonContrast: "#1F2C33",
        palette: {
          heading: "#1F2C33",
          body: "#2B3C42",
          muted: "#4A656B",
          divider: "rgba(31,44,51,0.15)",
          buttonBg: "#4F6F63",
          buttonText: "#F4F7F5",
          buttonHover: "#3C554B",
          card: {
            bg: "rgba(217, 231, 236, 0.94)",
            border: "rgba(95, 143, 153, 0.35)",
            text: "#1F2C33",
            subtext: "#3F5A60",
            bullet: "rgba(94, 138, 109, 0.45)",
            icon: "#4F6F63",
            shadow: "0 18px 48px rgba(35, 55, 60, 0.2)",
          },
        },
      },
    },
    footer: {
      bg: "linear-gradient(135deg, #3D5F67 0%, #244248 100%)",
      text: "#E8F4F6",
    },
    blog: {
      bg: "linear-gradient(135deg, #e0ecf3 0%, #c5dbe6 100%)",
      text: "#1F2C33",
      cardBg: "rgba(255,255,255,0.94)",
      cardText: "#1F2C33",
      listBg: "linear-gradient(135deg, rgba(224,236,243,0.9) 0%, rgba(197,219,230,0.6) 100%)",
      palette: {
        nav: "#34515A",
        navMuted: "#5F7B82",
        heading: "#1D2F36",
        body: "#1E3238",
        muted: "#4A666C",
        divider: "#8BB0BA",
        date: "#5F8F99",
        cardBorder: "#B3CAD2",
        buttonBg: "#4F6F63",
        buttonText: "#F4F7F5",
        buttonHover: "#3C554B",
        pillBorder: "rgba(94,138,109,0.35)",
      },
    },
  },
  snow: {
    accent: "#58779d",
    text: "#24324a",
    sections: {
      about: {
        bg: "linear-gradient(135deg, #f9fbfd 0%, #ecf2f9 100%)",
        text: "#24324a",
        palette: {
          heading: "#223049",
          accent: "#5F7AA4",
          muted: "#4A5E7A",
          divider: "#92A8C5",
          card: {
            bg: "rgba(236,243,251,0.95)",
            border: "#C5D5EB",
            text: "#213048",
            muted: "#4A5E7A",
          },
          cardAlt: {
            bg: "rgba(229,239,248,0.92)",
            border: "#B9CBDF",
            text: "#213048",
          },
        },
      },
      portfolio: {
        bg: "linear-gradient(135deg, #f1f5fa 0%, #dfe9f5 100%)",
        text: "#24324a",
        palette: {
          heading: "#223049",
          accent: "#5F7AA4",
          muted: "#4C607D",
          divider: "#90A8C6",
          card: {
            bg: "rgba(238,244,251,0.95)",
            border: "#C5D5EB",
            text: "#213048",
            muted: "#4C607D",
          },
          featureCard: {
            bg: "rgba(231,239,249,0.94)",
            border: "#BBD0E7",
            text: "#1F2E47",
          },
          projectCard: {
            bg: "rgba(240,245,252,0.95)",
            border: "#C8D7EB",
            text: "#1F2E47",
            muted: "#4C607D",
          },
          button: {
            bg: "#58779d",
            text: "#F3F7FD",
            hover: "#435E83",
          },
        },
      },
      certifications: {
        bg: "linear-gradient(135deg, #f6f8fc 0%, #e5edf7 100%)",
        text: "#24324a",
        palette: {
          heading: "#223049",
          accent: "#5F7AA4",
          muted: "#4A5E7A",
          divider: "#97B0CF",
          card: {
            bg: "rgba(240,246,252,0.95)",
            border: "#CAD9EE",
            text: "#1F2E47",
            muted: "#4A5E7A",
          },
        cardAlt: {
          bg: "rgba(234,242,251,0.94)",
          border: "#BFD2E8",
          text: "#1F2E47",
        },
        skillDeck: {
          labelBg: "rgba(95, 122, 164, 0.2)",
          labelText: "#5F7AA4",
          sublabelText: "#4A5E7A",
          countText: "#4A5E7A",
          groupBadgeBg: "rgba(95, 122, 164, 0.18)",
          groupBadgeText: "#5F7AA4",
          groupBadgeBorder: "rgba(95, 122, 164, 0.28)",
          itemBg: "rgba(236, 243, 251, 0.88)",
          itemBorder: "rgba(95, 122, 164, 0.32)",
          itemText: "#4D6282",
          tagBg: "rgba(95, 122, 164, 0.22)",
          tagBorder: "rgba(95, 122, 164, 0.35)",
          tagText: "#223049",
        },
      },
    },
      skills: {
        bg: "linear-gradient(135deg, #F3F7FC 0%, #DCE6F3 100%)",
        text: "#24324a",
        palette: {
          heading: "#223049",
          accent: "#5F7AA4",
          muted: "#4D6282",
          divider: "#94AAC9",
          badges: {
            languages: { gradient: ["#E6EFF8", "#CAD9F0"], text: "#20304A" },
            frameworks: { gradient: ["#DEE8F4", "#C0D0EC"], text: "#20304A" },
            tools: { gradient: ["#D7E3F2", "#B7C9E6"], text: "#20304A" },
            other: { gradient: ["#EDF3FA", "#D2DFF2"], text: "#20304A" },
          },
        },
      },
      contact: {
        bg: "linear-gradient(135deg, #d7e4f3 0%, #bacce3 100%)",
        text: "#24324a",
        buttonContrast: "#24324a",
        palette: {
          heading: "#1F2E47",
          body: "#273758",
          muted: "#4F6384",
          divider: "rgba(31,46,71,0.18)",
          buttonBg: "#58779d",
          buttonText: "#F3F7FD",
          buttonHover: "#445E86",
          card: {
            bg: "rgba(236, 244, 252, 0.94)",
            border: "rgba(95, 122, 164, 0.35)",
            text: "#20304A",
            subtext: "#4D6282",
            bullet: "rgba(95, 122, 164, 0.4)",
            icon: "#58779d",
            shadow: "0 18px 48px rgba(56, 74, 105, 0.22)",
          },
        },
      },
    },
    footer: {
      bg: "linear-gradient(135deg, #3C506A 0%, #24324A 100%)",
      text: "#F3F7FD",
    },
    blog: {
      bg: "linear-gradient(135deg, #f8fafc 0%, #e7edf5 100%)",
      text: "#24324a",
      cardBg: "rgba(255,255,255,0.94)",
      cardText: "#24324a",
      listBg: "linear-gradient(135deg, rgba(248,250,252,0.92) 0%, rgba(231,237,245,0.6) 100%)",
      palette: {
        nav: "#3A4B67",
        navMuted: "#637693",
        heading: "#223049",
        body: "#233555",
        muted: "#4D6282",
        divider: "#94AAC9",
        date: "#5F7AA4",
        cardBorder: "#C3D3E9",
        buttonBg: "#58779d",
        buttonText: "#F3F7FD",
        buttonHover: "#435E83",
        pillBorder: "rgba(88,119,157,0.35)",
      },
    },
  },
};

const CONDITION_ALIASES = {
  thunderstorm: "rain",
  drizzle: "rain",
  mist: "rain",
  smoke: "clouds",
  haze: "clouds",
  dust: "clouds",
  fog: "clouds",
  sand: "clear",
  ash: "clear",
  squall: "clear",
  tornado: "clear",
};

const SUBTEXT_KEYS = new Set([
  "muted",
  "body",
  "sublabelText",
  "countText",
  "itemText",
  "tagText",
  "labelText",
  "navMuted",
  "groupBadgeText",
  "cardText",
  "listText",
  "pillText",
  "description",
]);

const withHighContrastSubtext = (theme, useLightSubtext = false) => {
  if (!theme) return theme;
  const clone = JSON.parse(JSON.stringify(theme));
  const targetColor = useLightSubtext ? "#FFFFFF" : "#000000";

  const apply = (node) => {
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      if (value && typeof value === "object") {
        apply(value);
      }

      if (SUBTEXT_KEYS.has(key) && typeof node[key] === "string") {
        node[key] = targetColor;
      }
    }
  };

  apply(clone);
  return clone;
};

const themeFor = (condition, isNight = false) => {
  if (isNight) return MAIN_THEME;
  const key = (condition || "").toLowerCase();
  const resolved = CONDITION_ALIASES[key] || key;
  return THEMES[resolved] || MAIN_THEME;
};

const buildTheme = (condition, isNight = false) => {
  const baseTheme = themeFor(condition, isNight);
  const useLightSubtext = baseTheme === MAIN_THEME;
  return withHighContrastSubtext(baseTheme, useLightSubtext);
};

const STORAGE_KEY = "wxData";
const TIMESTAMP_KEY = "wxFetchedAt";
const MANUAL_KEY = "wxManualCondition";
const TTL = 10 * 60 * 1000; // 10 minutes per session

export default function useWeatherTheme() {
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState(() => withHighContrastSubtext(MAIN_THEME, true));
  const [manualCondition, setManualCondition] = useState(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(MANUAL_KEY);
  });

  useEffect(() => {
    if (typeof window === "undefined" || manualCondition) return;

    try {
      const cachedRaw = sessionStorage.getItem(STORAGE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        setWeather(cached);
        setTheme(buildTheme(cached.condition, cached.isNight));
      }

      const last = Number(sessionStorage.getItem(TIMESTAMP_KEY) || 0);
      const now = Date.now();
      if (now - last < TTL && cachedRaw) {
        return;
      }

      (async () => {
        try {
          const res = await fetch("/api/weather", { cache: "no-store" });
          if (!res.ok) throw new Error("weather");
          const data = await res.json();
          setWeather(data);
          setTheme(buildTheme(data.condition, data.isNight));

          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          sessionStorage.setItem(TIMESTAMP_KEY, String(Date.now()));
        } catch {
          // Optional: leave default theme
        }
      })();
    } catch {
      // Ignore JSON parse issues and fall back to network attempt next load.
    }
  }, [manualCondition]);

  useEffect(() => {
    if (!manualCondition) return;
    const mock = {
      city: null,
      condition: manualCondition,
      tempC: 20,
      updatedAt: new Date().toISOString(),
      isNight: false,
      source: "manual",
    };
    setWeather(mock);
    setTheme(buildTheme(manualCondition));
  }, [manualCondition]);

  const setManualOverride = (condition) => {
    if (typeof window === "undefined") return;
    if (condition) {
      sessionStorage.setItem(MANUAL_KEY, condition);
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(TIMESTAMP_KEY);
      setManualCondition(condition);
    } else {
      sessionStorage.removeItem(MANUAL_KEY);
      setManualCondition(null);
      // force re-fetch next time by clearing cached data
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(TIMESTAMP_KEY);
    }
  };

  return {
    weather,
    theme,
    manualCondition,
    setManualOverride,
    mainTheme: withHighContrastSubtext(MAIN_THEME, true),
  }; // weather: { city, condition, tempC, updatedAt }
}
