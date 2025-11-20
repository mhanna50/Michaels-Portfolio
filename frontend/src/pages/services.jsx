import React from "react";
import ServicesPageLayout from "./ServicesPageLayout";
import { designServicesConfig } from "@/data/servicesPageConfigs";

export default function ServicesPage(props) {
  return <ServicesPageLayout {...props} config={designServicesConfig} />;
}
