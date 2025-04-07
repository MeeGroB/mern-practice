import { useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from "@/store/product"
import { Container, VStack, Heading, Box, Input, Button } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"
import { useState } from "react"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })


  const {createProduct} = useProductStore()

  const handleAddProduct = async()=> {
    const { success, message} = await createProduct(newProduct)
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

    setNewProduct({ name: "", price: "", image: ""})
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"5xl"} textAlign={"center"} mb={8}>
          Create new Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input 
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e)=> setNewProduct({ ...newProduct, name: e.target.value})}
            />

            <Input 
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e)=> setNewProduct({ ...newProduct, price: e.target.value})}
            />

            <Input 
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e)=> setNewProduct({ ...newProduct, image: e.target.value})}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>

          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage