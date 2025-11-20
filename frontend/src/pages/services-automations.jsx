import React from "react";
import ServicesPageLayout from "./ServicesPageLayout";
import { automationServicesConfig } from "@/data/servicesPageConfigs";

export default function AutomationServicesPage(props) {
  return <ServicesPageLayout {...props} config={automationServicesConfig} />;
}
