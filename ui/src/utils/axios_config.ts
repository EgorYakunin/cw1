const auth_config = {
  headers: {
    authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
  },
};

const default_url =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337/api";

export { auth_config, default_url };
