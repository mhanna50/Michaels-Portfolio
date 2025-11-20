import React from "react";
import ServicesPageLayout from "./ServicesPageLayout";
import { webDesignSpecialtyConfig } from "@/data/servicesPageConfigs";

export default function WebDesignServicesPage(props) {
  return <ServicesPageLayout {...props} config={webDesignSpecialtyConfig} />;
}
