export const JSON_HEADER = {
  "Content-type": "application/json",
};

export const AUTHORIZATION_HEADER = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
