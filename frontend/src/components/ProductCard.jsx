import { Box, Image, Heading, Text, HStack, IconButton, Dialog, Portal, CloseButton, VStack, Input, Button } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { useState } from "react";

const ProductCard = ({product}) => {

  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg = useColorModeValue("white", "gray.800")
  const deleteBtn = useColorModeValue("red.400", "red.400")

  const [updatedProduct, setUpdatedProduct] = useState(product)

  const { deleteProduct, updateProduct} = useProductStore()

  const handleDeleteProduct = async(pid)=> {
    const { success, message} = await deleteProduct(pid);

    if(!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        type: "error",
        isClosabe: true,
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      })
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        type: "success",
        isClosabe: true
      })
    }
  };

  const handleUpdateProduct = async(pid, updatedProduct) => {
    await updateProduct(pid, updatedProduct);
    
    toaster.create({
      title: "Success",
      description: "Product updated successfully",
      status: "success",
      type: "success",
      isClosabe: true
    })
    
  }

  return (
    <Box shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{transform: "translateY(-1px)", shadow: "xl"}}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={"48"} w={"full"} objectFit={"cover"}/>

      <Box p={"4"}>
        <Heading as="h3" size={"md"} mb={"2"} >
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={"4"}>
          ${product.price}
        </Text>

        <HStack spaceX={"2"} >
        <Dialog.Root placement={"center"} lazyMount>
        <Dialog.Trigger asChild>
          <IconButton colorScheme={"light"} >
              <MdModeEdit />
            </IconButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner> 
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <VStack>
                  <Input
                    placeholder="Product name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}
                  >
                  </Input>

                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}
                  >
                  </Input>

                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}
                  >
                  </Input>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" px={"5"}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                <Button px={"5"} onClick={()=>handleUpdateProduct(product._id, updatedProduct)} 
                  >
                  update
                </Button>
                </Dialog.ActionTrigger>
                
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>

        </Dialog.Root>

          <IconButton bg={deleteBtn} onClick={()=> handleDeleteProduct(product._id)} color={"whiteAlpha.900"}>
            <MdDeleteForever />
          </IconButton>
        </HStack>

      </Box>

      
    </Box>
  )
}

export default ProductCard