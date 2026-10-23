export function Seo({
  title,
  description = "JEE, NEET and Foundation coaching academy for Classes 8 to 12. Weekly tests, ranked and reviewed.",
  ogImage = "/images/og-image.jpg",
  canonical
}) {
  const fullTitle = title ? `${title} | MERITON` : "MERITON | Serious preparation, tracked weekly.";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
}

export default Seo;
