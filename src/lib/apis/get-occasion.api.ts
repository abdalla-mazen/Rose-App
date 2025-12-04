export async function getOccasions(id: string) {
  const response = await fetch(`${process.env.API}/occasions/${id}`);

  if (!response.ok) {
    throw new Error("response was not ok");
  }

  const payload = await response.json();

  return payload;
}
