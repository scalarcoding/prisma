-- Drop the procedure if it already exists
DROP FUNCTION IF EXISTS update_supply_qty_and_status(JSONB, TEXT, TEXT);

-- Create the procedure
CREATE OR REPLACE FUNCTION update_supply_qty_and_status(
    p_items JSONB,        -- Input JSONB array of objects
    p_wr_number TEXT,     -- The warehouse requisition number
    p_district TEXT       -- The district constraint
)
RETURNS VOID AS $$
DECLARE
    item JSONB; -- Variable to iterate through the JSONB array
BEGIN
    -- Loop through each item in the JSONB array
    FOR item IN
        SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        -- Update the warehouse_requisition_items table
        UPDATE warehouse_requisition_items
        SET supply_qty = (item ->> 'supplied_qty')::INTEGER,
            supply_status = (item ->> 'supply_status')::INTEGER,
            pending_qty = (item ->> 'pending_qty')::INTEGER
        WHERE wr_number = p_wr_number
          AND item_number = (item ->> 'id')::INTEGER
          AND EXISTS (
              SELECT 1
              FROM warehouse_requisitions
              WHERE wr_number = p_wr_number
                AND district = p_district
          );

        -- Decrement the soh in the district_stock table based on the issued quantity
        UPDATE district_stock
        SET soh = soh - (item ->> 'supply_qty')::INTEGER
        WHERE district = p_district
          AND reg_number = (item ->> 'reg_number')::INTEGER;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
