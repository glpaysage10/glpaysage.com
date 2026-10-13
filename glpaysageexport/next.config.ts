import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // GLPaysage ne propose plus de prestations de création paysagère :
    // ces pages ont été retirées. On redirige les URL encore indexées ou
    // mises en favori vers l'index des services plutôt que de laisser un 404.
    return [
      {
        source: "/services/creation-de-jardin",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/amenagement-exterieur",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
