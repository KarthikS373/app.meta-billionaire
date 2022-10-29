import { Box, Flex, Text } from "@chakra-ui/react";
import matter from "gray-matter";
import fs from "fs";
import md from "markdown-it";
import Layout from "../../components/Layout/Layout";
import { join } from "path";
import { client, urlFor } from '../../lib/client';
import {PortableText} from "@portabletext/react";
const News = ({ post }:any) => {
  const portableTextComponents = {
    types: {
      image: ({ value }:any) => <img className='mx-auto rounded-xl my-16' src={urlFor(value) as any} />,
    },

    marks: {
      link: ({ children, value }:any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
            <a className='text-blue-400 underline' href={value.href} rel={rel}>
              {children}
            </a>
        )
      },
      strong: ({ text }:any) => {
        return <span className='text-pink-400'>{text}</span>
      },
      h1: (prop:any) => {
        console.log(prop)
        return <p>Hello</p>
      }
    },
  }
  return (
      <Layout key={post.slug.current}>
        <Flex
            my={["md", "md", "lg", "lg"]}
            align="center"
            justify="center"
            w="100%"
            flexDir="column"
            px="md"
            maxW="container.md"
            m="0 auto"
        >
          <Text
              mb="sm"
              mt={["md", "md", 0, 0]}
              fontSize={[22, 22, 25, 25]}
              textAlign="center"
              fontFamily="MontserratBold"
          >
            {post.title}
          </Text>
          <Text mb="sm" fontSize={17} fontFamily="OpenSans">
            {post.publishedAt}
          </Text>
          <PortableText value={post.body} components={portableTextComponents} />
        </Flex>
      </Layout>
  );
};

export async function getStaticProps({ params: { slug } }: any) {
  const posts = await client.fetch(`*[_type == "post"]`);

  return {
    props: {
      post:posts.find((post:any)=>post.slug.current===slug)
    },
  };
}

export async function getStaticPaths() {
  const posts = await client.fetch(`*[_type == "post"]`);
  console.log(posts[0]);
  const paths = posts.map((post:any)=>({params:{slug:post.slug.current}}))
  return {
    paths,
    fallback:false
  };
}

export default News;
