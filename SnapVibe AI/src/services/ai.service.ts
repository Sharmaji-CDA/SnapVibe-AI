export const generateAIImage = async (prompt: string) => {
  const res = await fetch("/generateAIImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const error = await res.json();

    // pass meaningful message to UI
    throw new Error(
      error?.message || "AI service failed"
    );
  }

  return res.json(); // { imageUrl }
};
