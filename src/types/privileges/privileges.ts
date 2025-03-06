 type POPrivilege ={
    po_create:boolean;
    po_modify:boolean;
    po_approve:boolean;
    po_receive:boolean;
    po_discrepancy:boolean;
}
type PRPrivilege ={
    pr_create:boolean;
    pr_modify:boolean;
    pr_approve:boolean;
    pr_receive:boolean;
    pr_discrepancy:boolean;
}
type WRPrivilege ={
    wr_create:boolean;
    wr_modify:boolean;
    wr_approve:boolean;
    wr_posting:boolean;
    wr_return:boolean;
}
type CataloguePrivilege ={
    catalogue_create:boolean;
    catalogue_modify:boolean;
    catalogue_approve:boolean;
    catalogue_archive:boolean;
}


export type { POPrivilege, PRPrivilege, WRPrivilege, CataloguePrivilege }