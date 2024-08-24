import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./custom.css";

export default function ApiDocs() {
  return <SwaggerUI url="/open-api/document.yaml" />;
}
