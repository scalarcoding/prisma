import TabCatalogueDistributionInfo from "./TabCatalogueDistributionInfo";
import TabCatalogueDistrictConfiguration from "./TabCatalogueDistrictConfiguration";
import TabCatalogueGeneralInfo from "./TabCatalogueGeneralInfo";
import TabCatalogueOperationalInfo from "./TabCatalogueOperationalInfo";
import TabCatalogueProvisioningInfo from "./TabCatalogueProvisioningInfo";
import TabCataloguePurchasingInfo from "./TabCataloguePurchasingInfo";
import { TabData } from "./TabdataType";

const tabsData: TabData[] = [
    { value: "cat_general", label: "General", child: <TabCatalogueGeneralInfo/> },
    { value: "cat_provisioning", label: "Provisioning", child: <TabCatalogueProvisioningInfo /> },
    { value: "cat_operational", label: "Operational", child: <TabCatalogueOperationalInfo /> },
    { value: "cat_purchasing", label: "Purchasing", child: <TabCataloguePurchasingInfo /> },
    { value: "cat_distribution", label: "Distribution", child: <TabCatalogueDistributionInfo /> },
    { value: "cat_districtconf", label: "District Config.", child: <TabCatalogueDistrictConfiguration /> },

    
    
  ];


export default tabsData;