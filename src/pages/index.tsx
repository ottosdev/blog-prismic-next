import Head from "next/head";
import styles from "../styles/home.module.scss";
import { GetStaticProps } from "next";
import {getPrismicClient} from '../services/prismic'
import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'

interface ContentProps {
  content: {
    title: string;
    subtitle: string
  }
}

export default function Home({ content} : ContentProps) {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.headerSection}>
            <h1>{content.title}</h1>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              commodi nihil similique? Obcaecati minus dolorum dolor eaque
              adipisci tempora eligendi excepturi, nihil sit! Sunt eos, incidunt
              autem amet harum suscipit.
            </span>
            <a>
              <button>Começar agora</button>
            </a>
          </section>
          <img
            src="https://th.bing.com/th/id/OIP.g6uwJLsoCBZ33MAynNZJYwHaEK?pid=ImgDet&rs=1"
            alt=""
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section className={styles.headerSection}>
            <h2>Aprender apliacativos mobile</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
              voluptatum! Sunt exercitationem, ipsa excepturi minus quidem
              repellendus iure optio tempora obcaecati atque explicabo incidunt
              suscipit, dolorem esse aliquid odio vero?
            </span>
          </section>
          <img src="https://camo.githubusercontent.com/20d61902c547d96024bffbd7c5c1f0c234d97c5e1f38a71f8b826c1af8b09c19/68747470733a2f2f6e6176636f6d6d756e6974792e6e65742f6173736574732f696d672f6e6578742d6d6f62696c652e706e67" alt="" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img src="https://blog.eduonix.com/wp-content/uploads/2018/12/Untitled-3.jpg" alt="" />
          <section className={styles.headerSection}>
            <h2>Aprendar a criar sistemas web</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
              voluptatum! Sunt exercitationem, ipsa excepturi minus quidem
              repellendus iure optio tempora obcaecati atque explicabo incidunt
              suscipit, dolorem esse aliquid odio vero?
            </span>
          </section>
        </div>

        <div className={styles.nextLevel}>
            <h2>Mais de <span className={styles.alunos}>15 mil</span> ja levaram sua carreira ao proximo nivel</h2>
            <span>E voce vai perder a chance de evoluir mais de uma vez por todas?</span>
            <a><button>Acessar turma</button></a>
        </div>

      </main>
    </>
  );
}


export const getStaticProps: GetStaticProps =async ({}) => {
  const primic = getPrismicClient()
  const response = await primic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])
 const {title,subtitle } = response.results[0].data as any;

 const content = {
  title: RichText.asText(title),
  titleContent: RichText.asText(subtitle)
 }

  return {
    props: {
      content
    },
    revalidate: 60
  }
}