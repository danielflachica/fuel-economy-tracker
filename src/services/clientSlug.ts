const STORAGE_KEY = "client_slug";
const DEFAULT_CLIENT_SLUG = "dfl";

export const getClientSlug = (): string => {
  const fromUrl = new URLSearchParams(window.location.search).get("u");

  if (fromUrl) {
    try {
      localStorage.setItem(STORAGE_KEY, fromUrl);
    } catch {}
    return fromUrl;
  }

  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_CLIENT_SLUG;
  } catch {
    return DEFAULT_CLIENT_SLUG;
  }
};
