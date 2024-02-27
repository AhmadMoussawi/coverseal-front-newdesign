import Head from 'next/head';
import Script from 'next/script';
export default function StructuredData({ data, id }) {
  return (
    
      <script
        key={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    
  );
}
