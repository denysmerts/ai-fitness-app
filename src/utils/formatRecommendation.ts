export const formatRecommendation = (text: string): string => {
  if (!text) return "";

  // ✅ Remove surrounding quotes
  let cleaned = text.replace(/^"|"$/g, "").trim();

  const trigger = "here are some important tips";
  const lower = cleaned.toLowerCase();
  const idx = lower.indexOf(trigger);

  if (idx === -1) return `<p>${cleaned}</p>`;

  const before = cleaned.slice(0, idx).trim();
  let after = cleaned
    .slice(idx + trigger.length)
    .replace(/^[:\-–\s]+/, "")
    .trim();

  const emphasisHeaders = ["notice", "consistency"];
  const usedHeaders = new Set<string>(); // ✅ Track headers already used

  const sections: string[] = [];
  let currentBullets: string[] = [];

  const pushBullets = () => {
    if (currentBullets.length > 0) {
      sections.push(`<ul>${currentBullets.join("")}</ul>`);
      currentBullets = [];
    }
  };

  sections.push(`<p><strong>Here are some important tips:</strong></p>`);

  let sentences = after
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  sentences.forEach((sentence) => {
    const foundHeader = emphasisHeaders.find((h) =>
      sentence.toLowerCase().startsWith(h)
    );

    if (foundHeader) {
      const headerLower = foundHeader.toLowerCase();

      // ✅ Remove the header text from the sentence
      let remaining = sentence
        .replace(new RegExp(`^${foundHeader}[:\\-]?`, "i"), "")
        .trim()
        .replace(/^[,.\s-]+/, "")
        .trim();

      if (!usedHeaders.has(headerLower)) {
        // ✅ First time seeing this header → it's a true header
        pushBullets();
        usedHeaders.add(headerLower);

        sections.push(
          `<p><strong>${
            foundHeader.charAt(0).toUpperCase() + foundHeader.slice(1)
          }:</strong></p>`
        );

        if (remaining) currentBullets.push(`<li>${remaining}</li>`);
      } else {
        // ✅ Header seen before → treat entire line as a bullet
        const bulletText =
          remaining.length > 0 ? remaining : sentence.split(":")[1]?.trim();
        if (bulletText) currentBullets.push(`<li>${bulletText}</li>`);
      }
    } else {
      currentBullets.push(`<li>${sentence}</li>`);
    }
  });

  pushBullets();

  return `
    <p>${before}</p>
    ${sections.join("")}
  `.trim();
};
