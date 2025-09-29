export async function verifyUserToken(token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // important for fresh check
    });

    if (!res.ok) {
      return null; // token invalid
    }

    const data = await res.json();
    return data.user; // contains id and email
  } catch (err) {
    return null;
  }
}
