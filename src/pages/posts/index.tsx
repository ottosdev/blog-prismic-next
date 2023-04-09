import Head from "next/head";

import styles from "./styles.module.scss";
import Link from "next/link";
import Prismic from "@prismicio/client";
import Image from "next/image";
import thumbImg from "../../../public/images/thumb.png";

import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import { useState } from "react";

interface PostsProps {
  posts: {
    slug: number;
    title: string;
    description: string;
    cover: string;
    updatedAt: string;
  }[];
  page: string;
  totalPage: string;
}

export default function Posts({
  posts: postsBlog,
  page,
  totalPage,
}: PostsProps) {
  const [posts, setPosts] = useState(postsBlog || []);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [totalPages, setTotalPages] = useState(Number(totalPage));

  async function reqPost(pageNumber: number){
    const prismic = getPrismicClient();

    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'post')
    ], {
      orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
      fetch: ['post.title', 'post.description', 'post.cover'],
      pageSize: 3,
      page: String(pageNumber)  
    })

    return response;
  }

  async function navigatePage(pageNumber: number){
    const response = await reqPost(pageNumber);

    if(response.results.length === 0){
    return;      
    }

    const getPosts = response.results.map( (post: any) => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        description: post.data.description.find((content: any) => content.type === 'paragraph')?.text ?? '',
        cover: post.data.cover.url,
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    setCurrentPage(pageNumber)
    setPosts(getPosts);

  }
  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((item) => (
            <Link href={`/posts/${item.slug}`} key={item.slug}>
              <Image
                src={item.cover}
                alt="Post titulo 1"
                width={720}
                height={410}
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkePq/HgAFNgJl11bDBQAAAABJRU5ErkJggg=="
              />
              <strong>{item.title}</strong>
              <time>{item.updatedAt}</time>

              <p>
                Hoje vamos criar o controle de mostrar a senha no input, uma
                opção para os nossos formulários de cadastro e login. Mas chega
                de conversa e bora pro código junto comigo que o vídeo está show
                de bola!
              </p>
            </Link>
          ))}

          <div className={styles.buttonNavigate}>
            {currentPage >= 2 && (
              <div>
                <button onClick={() => navigatePage(1)}>
                  <FiChevronsLeft size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                  <FiChevronLeft size={25} color="#FFF" />
                </button>
              </div>
            )}

            {currentPage < totalPages && (
              <div>
                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                  <FiChevronRight size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(totalPage))}>
                  <FiChevronsRight size={25} color="#FFF" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({}) => {
  const primic = getPrismicClient();
  const response = await primic.query(
    [Prismic.Predicates.at("document.type", "post")],
    {
      orderings: "[document.last_publication_date desc]",
      fetch: ["post.title", "post.description", "post.cover"],
      pageSize: 3,
    }
  );

  const posts = response.results.map((post: any) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:
        post.data.description.find(
          (content: any) => content.type === "paragraph"
        )?.text ?? "",
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-Br",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
      page: response.page,
      totalPage: response.total_pages,
    },
    revalidate: 60,
  };
};
