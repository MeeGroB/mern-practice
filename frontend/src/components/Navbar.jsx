import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { RiMoonClearLine } from "react-icons/ri";
import { PiSunBold } from "react-icons/pi";
import { useProductStore } from "@/store/product";

const Navbar = () => {
    const { colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} >
        <Flex 
            h={16} 
            alignItems={"center"} 
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
        >
            <Text
                fontSize={{ base: "22px", sm: "28px"}}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"to-r"}
                gradientFrom={"cyan.400"}
                gradientTo={"blue.500"}
                bgClip={"text"}
            >
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <CiSquarePlus value={{ style: {fontSize: "40px"}}} size={30}/>
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode ==="light" ? <RiMoonClearLine />: <PiSunBold />}
                </Button>
                
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar