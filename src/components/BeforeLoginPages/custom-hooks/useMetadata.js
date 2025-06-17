import { useEffect } from "react";

const useMetadata = (schema = null) => {
  useEffect(() => {
    const existingJsonLdScripts = document.querySelectorAll(
      "script[type='application/ld+json']"
    );
    existingJsonLdScripts.forEach((script) => script.remove());

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(
        Array.isArray(schema) ? schema : [schema]
      );
      document.head.appendChild(script);
    }
  }, [schema]);
};

export default useMetadata;
