/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    cpus: 1,
    workerThreads: true,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 100
  }
};

export default nextConfig;
