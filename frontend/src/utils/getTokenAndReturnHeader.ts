export function getTokenAndReturnHeader(key: string) {
  const token = sessionStorage.getItem(key);

  return {
    Authorization: `Bearer ${token}`,
  };
}
