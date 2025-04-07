import { useProductStore } from "@/store/product"
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link} from "react-router-dom"
import ProductCard from "@/components/ProductCard"

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();
  useEffect(()=> {
    fetchProducts();
  }, [fetchProducts])

  console.log("Products ", products)
  return (
    <Container maxW="container.xl" py={"12"}>
      <VStack spaceX={8}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          textAlign={"center"}
          mb={"4"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          gap="4"
          w={"full"}
        >
          {products.map((product)=> (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text 
          fontSize="xl"
          texAlign={"center"}
          fontWeight={"bold"}
          color="gray.500"
          >
            No Products found 😢 {" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                    Create a product
                  </Text>
            </Link>
          </Text>
        )}
      </VStack>
      
    </Container>
  )
}

export default HomePage