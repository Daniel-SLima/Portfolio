const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/Portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
