export const SITE = {
  website: "https://sushmoy.pages.dev/", // replace this with your deployed domain
  author: "Mahmud Hossain Sushmoy",
  profile: "https://github.com/moysush",
  desc: "A clean, minimal portfolio and blog showcasing Full Stack and React Native development.",
  title: "Sushmoy",
  ogImage: "my-og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/moysush/sushmoy-space/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Dhaka", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
