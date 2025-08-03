import React from "react";

export function CitationLink({ id, callType = "recommend", citations = {}, className = "" }) {
  const citation = citations?.[id];
  if (!citation) return null;
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline hover:text-blue-700 ${className}`}
      title={citation.title || "Reference"}
    >
      {callType === "quote" ? `[${id}]` : citation.title || citation.url}
    </a>
  );
}