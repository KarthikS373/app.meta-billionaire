import Layout from "../components/Layout/Layout";
import { Text, Icon, Flex, Box, Link, Image, Spacer } from "@chakra-ui/react";
import FooterLink from "../components/Footer/FooterLink";
import { IoLogoTwitter } from "react-icons/io5";

const TeamsPage = () => {
    const teamMembers = [{
        image: "/teams/chiefExecutive.png",
        position: "CEO & PRESIDENT",
        twitter: "https://twitter.com/alectavarez",
        name: "Alec Tavarez",
        description: "Alec Tavarez has over 10 years of experience in Business Development, Strategy, and Data Analytics. In terms of Web2, Alec has built 6- and 7-figure rental car agencies, led B2B business partnerships with Fortune 500 companies, as well as helped build the initial sales operations and strategies for North American mid-market agencies for TikTok. In terms of Web3, Alec has been an avid NFT investor and trader since mid-2021, getting his first Web3 experience working with Metabillionaire in December of 2021. "
    }, {
        image: "/teams/chiefExecutive.png",
        position: "CHIEF INNOVATIONS OFFICER & VICE PRESIDENT",
        twitter: "https://twitter.com/sylvonmon",
        name: "Sylvain Nehme ",
        description: "Sylvain Nehme has over 10 years of experience in business development, data & analytics, and financial management. He has worked in both technical and financial positions helping develop automated and scalable solutions that increase performance, productivity, and efficiency company wide. Sylvain’s web3 journey started mid 2021 and has helped connect many communities and build a growing network of project leads/founders."
    }, {
        image: "/teams/chiefExecutive.png",
        position: "CHIEF COMMUNITY OFFICER & VICE PRESIDENT",
        twitter: "https://twitter.com/RiceRiddler",
        name: "Eric Si",
        description: "Eric Si has over 8 years of community management experience ranging from AR/VR, E-Sports, Mobile Gaming, and Web3 communities. In terms of Web2, he has real-world experience in conflict resolution, team-building, and education. As the main touchpoint of communication between the community and the team, Eric's main priority is to make sure the community is heard. He cares more about the community than he does about his Tinder dates (don’t ask)."
    }, {
        image: "/teams/chiefExecutive.png",
        position: "CHIEF OPERATIONS OFFICER & VICE PRESIDENT",
        twitter: "https://twitter.com/IBW_Mamba",
        name: "Tamir Hussein",
        description: "Tamir Hussein has over 10 years of experience in technology solutions and business building. As a Sales Consultant he has helped Web2 companies generate over $2M in net-new revenue. In 2020, Tamir fully-immersed himself into Web3 becoming a full-time cryptocurrency trader, NFT investor, and degen. The ultimate diamond hander (seriously…don’t ask)"
    }, {
        image: "/teams/chiefExecutive.png",
        position: "CHIEF MARKETING OFFICER",
        twitter: "https://twitter.com/iMariahETH",
        name: "Mariah Miller",
        description: "Mariah Miller is an award-winning eCommerce marketing specialist in paid ads, email & SMS Marketing. Her agency Scale Your Brand, has generated over $32 million for her clients’ eCommerce brands. Mariah’s former clients include Katie Brueckner (2.9M+ subscribers on YouTube), Phora (American Recording Artist), as well as Kaitlyn Bristowe (Former Bachelorette)."
    }, {
        image: "/teams/chiefExecutive.png",
        position: "WEB3 PARTNERSHIPS LEAD",
        twitter: "https://twitter.com/MHerndon37",
        name: "Mark the",
        description: "Mark the “middle man” Herndon A.K.A. GatorAPE is a professional athlete and entrepreneur. Since November of 2021, he has been helping athletes, celebrities, influencers, and companies take advantage of Web3 technology. With the experience that he has gained since entering the space, Mark will be helping lead the Metabillionaire charge in partnerships in Web2 and Web3 to help grow the brand. If you didn't know before, you know now- Mark was behind the team that put Metabillionaire in the Super Bowl making NFT and NFL history. He may be a Gator but, he doesn’t bite…hard. Feel free to connect with him."
    }, {
        image: "/teams/chiefExecutive.png",
        position: "CREATIVE DIRECTOR",
        twitter: "https://twitter.com/whoiscole_eth",
        name: "Cole Ryan",
        description: "Cole Ryan has a history of success in crypto after beginning his journey at the age of 16 years old. Starting out as a degen, he blended his skill and knowledge to design, develop, and scale many ventures in the Web3 realm. Using his background in event production, having worked on events such as Rolling Loud, Governor’s Ball, and MTV Music Awards, Cole has designed and lead activations, experiences, and events for Web3 organizations such as Ledger, MyBFF, and more."
    }, {
        image: "/teams/chiefExecutive.png",
        position: "CREATIVE DIRECTOR",
        twitter: "https://twitter.com/ethchoncey",
        name: "Choncey Coles",
        description: "Choncey Coles is the ultimate Web2 connector. He has organized events throughout the entire US, bringing together artists, creatives, event planners, and investors. Choncey has been a full-time cryptocurrency trader and investor for the last 7 years, leveraging his event-planning experience to bring people together. Beyond trading, Choncey is a veteran in botanical sciences (if you know, you know)."
    }]
    return (
        <Layout>
            <Text
                fontSize={30}
                w="80%"
                textAlign="center"
                textTransform="uppercase"
                mx="auto"
                mt="lg"
                mb="md"
            >
                Teams
            </Text>
            <Flex direction="column" px="20%">
                {teamMembers.map((teamMember: any) => {
                    return (
                        <Flex key={teamMember.twitter} wrap="wrap">
                            <Flex>
                                <Flex flexDir="column">
                                    <Flex flexWrap="wrap" justify="center" align="center">
                                        <Image src={teamMember.image} alt="Team Member image" w="200px" my="4px" mx={[0,0,"sm","sm"]} borderRadius="10px"/>
                                        <Flex direction="column" m="auto" flexWrap="wrap" justify="center">
                                            <Text
                                                textAlign="left"
                                                mx="auto"
                                                mt="sm"
                                                casing="uppercase"
                                                fontFamily="Montserrat"
                                                fontSize={19}
                                                fontWeight={900}
                                            >{teamMember.name}</Text>
                                            <Text
                                                textAlign="left"
                                                mx="auto"
                                                mt="sm"
                                                fontFamily="Montserrat"
                                                fontSize={19}
                                                fontWeight={400}
                                            >{teamMember.position}</Text>
                                        </Flex>
                                        <Flex
                                            align="center"
                                            as={Box}
                                            w="100px"
                                            h="80px"
                                            justify="center"
                                            bgColor="#ffffff"
                                            borderRadius={10}
                                            cursor="pointer"
                                            transition="all ease 0.5s"
                                            _hover={{
                                                transform: "scale(1.05)",
                                            }}
                                            shadow="lg"
                                        >
                                            <Link href={teamMember.twitter} >
                                                <Icon as={IoLogoTwitter} color="customBlue.500" w={42} h={42} />
                                            </Link>
                                        </Flex>
                                    </Flex>
                                    <Text
                                        textAlign="left"
                                        mx="auto"
                                        mt="sm"
                                        fontFamily="Montserrat"
                                        fontSize={19}
                                    >{teamMember.description}</Text>
                                </Flex>
                            </Flex>
                            <Box h="40px"/>
                        </Flex>
                    )
                })}
            </Flex>
            <FooterLink />
        </Layout>
    );
};

export default TeamsPage;
