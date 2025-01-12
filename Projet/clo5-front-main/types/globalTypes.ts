export type CountryUrls = {
  localWebsite: string;
  groupWebsite: string;
};

export type Logo = {
  dark: string;
  white: string;
};

export type Seo = {
  title: string;
  description: string;
};

export type SeoProps = {
  seo: Seo;
  socialMedia: SocialMedia;
};

export type SocialMedia = {
  og: SocialMediaItem;
  twitter: SocialMediaItem;
};

export type SocialMediaItem = {
  title: string;
  description: string;
  image: string;
};
