import React from "react";
import { CircleLink } from "../components/CircleLink";
import { Color } from "../utils/constants";

export function WysiwygTemplate({ pageProps }: PageProps<WysiwygPageContent>) {
  const { main_title, back_to_home_link_text, content } = pageProps;

  return (
    <main className="wysiwyg-template">
      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="content wysiwyg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="link-container">
          <CircleLink
            mainLink={{ href: "/", text: back_to_home_link_text }}
            textAlign="left"
          />
        </div>
      </section>
    </main>
  );
}
