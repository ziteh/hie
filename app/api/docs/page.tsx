// The API docs page

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./custom.css";

export default function ApiDocs() {
  return <SwaggerUI url="/openapi/document.yaml" />;
}
