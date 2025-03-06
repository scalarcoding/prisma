import { supabase } from "@/api/repository/supabase";
import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
import { CurrentUser } from "@/types/user";
import { getUserCart } from "./getUserCart";




function checkSession(expiredAt: string | Date): boolean {
    const expirationTime = new Date(expiredAt).getTime(); // Convert expiredAt to milliseconds
    const now = Date.now(); // Current time in milliseconds
    return now < expirationTime; // True if session is valid
}

async function getCurrentUserByEmail(email: string): Promise<CurrentUser | null> {

    try {
        // Fetch data from Supabase RPC
        const { data, error } = await supabase.rpc('get_user_privileges_by_email', { email_input: email });

        if (error) throw error;

        if(!data) return null;

        if (data && data.length > 0) {
            const result = data[0];

            // Fetch the cart data
            const userCart: WarehouseRequisitionCart[] = await getUserCart(result.user_id);
            // Map the result to the CurrentUser structure
            const currentUser: CurrentUser = {
                userid: result.user_id,
                email: email,
                district : result.district,
                lastActiveDistrict:result.last_active_district,
                isSessionActive: checkSession(result.expired_at),
                poPrivilege: {
                    po_create: result.po_create,
                    po_modify: result.po_modify,
                    po_approve: result.po_approve,
                    po_receive: result.po_receive,
                    po_discrepancy: result.po_discrepancy,
                },
                prPrivilege: {
                    pr_create: result.pr_create,
                    pr_modify: result.pr_modify,
                    pr_approve: result.pr_approve,
                    pr_receive: result.pr_receive,
                    pr_discrepancy: result.pr_discrepancy,
                },
                wrPrivilege: {
                    wr_create: result.wr_create,
                    wr_modify: result.wr_modify,
                    wr_approve: result.wr_approve,
                    wr_posting: result.wr_posting,
                    wr_return: result.wr_return,
                },
                cataloguePrivilege: {
                    catalogue_create: result.catalogue_create,
                    catalogue_modify: result.catalogue_modify,
                    catalogue_approve: result.catalogue_approve,
                    catalogue_archive: result.catalogue_archive,
                },
                cart: userCart,
            };

            return currentUser;
        }

        console.warn('No data found for the given email.');
        return null;
    } catch (error) {
        console.error('Error fetching user privileges:', error);
        return null;
    }


}

async function getCurrentUserByAccessToken(accesstoken: string): Promise<CurrentUser | null> {
    try {
        // Fetch data from Supabase RPC
        const { data, error } = await supabase.rpc('get_user_privileges_by_access_token', { access_token_input: accesstoken });

        if (error) throw error;

        if (data && data.length > 0) {
            const result = data[0];

            // Fetch the cart data
            const userCart: WarehouseRequisitionCart[] = await getUserCart(result.user_id);
            // Map the result to the CurrentUser structure
            const currentUser: CurrentUser = {
                userid: result.user_id,
                email: result.email,
                district : result.district,
                lastActiveDistrict:result.last_active_district,
                isSessionActive: checkSession(result.expired_at),
                poPrivilege: {
                    po_create: result.po_create,
                    po_modify: result.po_modify,
                    po_approve: result.po_approve,
                    po_receive: result.po_receive,
                    po_discrepancy: result.po_discrepancy,
                },
                prPrivilege: {
                    pr_create: result.pr_create,
                    pr_modify: result.pr_modify,
                    pr_approve: result.pr_approve,
                    pr_receive: result.pr_receive,
                    pr_discrepancy: result.pr_discrepancy,
                },
                wrPrivilege: {
                    wr_create: result.wr_create,
                    wr_modify: result.wr_modify,
                    wr_approve: result.wr_approve,
                    wr_posting: result.wr_posting,
                    wr_return: result.wr_return,
                },
                cataloguePrivilege: {
                    catalogue_create: result.catalogue_create,
                    catalogue_modify: result.catalogue_modify,
                    catalogue_approve: result.catalogue_approve,
                    catalogue_archive: result.catalogue_archive,
                },
                cart: userCart,
            };

            return currentUser;
        }

        console.warn('No data found for the given email.');
        return null;
    } catch (error) {
        console.error('Error fetching user privileges:', error);
        return null;
    }
}


export { getCurrentUserByEmail, getCurrentUserByAccessToken }