import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbEdit } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { uploadImageForPreferredPN } from "@/api/products/uploadImageForPreferredPN";

interface ProductCardMenuProps {
  reg_number: number; // Adjust the type if reg_number is a string
}

export const ProductCardMenu: React.FC<ProductCardMenuProps> = ({
  reg_number
}) => {


  const handleChangeProductImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Change Image in Preferred PN for Reg Number:', reg_number);
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      await uploadImageForPreferredPN(e.target.files[0], reg_number);
      window.location.reload();
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <TbEdit />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Catalogue Actions</DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal">Change Image in Preferred PN</DropdownMenuLabel>

            <Input
            className="z-99 p-2"
              id="picture"
              type="file"
              onChange={handleChangeProductImage}
            />
   
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Modify Basic Info</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Product Name</DropdownMenuItem>
                  <DropdownMenuItem>Product Description</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Modify Provisioning Info
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Menu 1</DropdownMenuItem>
                  <DropdownMenuItem>Menu 2</DropdownMenuItem>
                  <DropdownMenuItem>Menu 3</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Modify Operational Info
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Menu 1</DropdownMenuItem>
                  <DropdownMenuItem>Menu 2</DropdownMenuItem>
                  <DropdownMenuItem>Menu 3</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Modify Purchasing Info
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Menu 1</DropdownMenuItem>
                  <DropdownMenuItem>Menu 2</DropdownMenuItem>
                  <DropdownMenuItem>Menu 3</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Modify Distribution Info
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Menu 1</DropdownMenuItem>
                  <DropdownMenuItem>Menu 2</DropdownMenuItem>
                  <DropdownMenuItem>Menu 3</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Modify District Config
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Menu 1</DropdownMenuItem>
                  <DropdownMenuItem>Menu 2</DropdownMenuItem>
                  <DropdownMenuItem>Menu 3</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
