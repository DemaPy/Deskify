import { createApi } from "unsplash-js";

export const unsplashAPI = createApi({
  accessKey: process.env.NEXT_PUBLIC_MY_ACCESS_KEY!,
  fetch: fetch,
});
