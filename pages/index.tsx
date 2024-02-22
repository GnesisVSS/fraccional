import Head from "next/head";
import Image from "next/image";

import img_meme_hormiga from "~/public/meme_hormiga.png";

export default function PagesRoot() {
  const href = "https://www.fraccional.cl?ref=fraccionar";

  return (
    <main className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-black flex-1">
      <Head>
        <title>Fraccionar pero en realidad es Fraccional con L al final</title>
        <meta
          name="description"
          content="Este sitio es para prevenir phishing en Fraccional. El link correcto es: https://www.fraccional.cl"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="mx-auto w-full max-w-3xl py-32 px-4">
        <header>
          <h1 className="text-6xl font-semibold">Lo escribiste mal</h1>
          <div className="mt-8 text-2xl">
            <p>Es con L al final.</p>
            <p>Errar es humano.</p>
            <p>
              <em>Ellal</em> si escribimos <em>Errar</em> solo con Ls.
            </p>
          </div>
          <div className="mt-8 text-2xl">
            <p>
              <span className="hover:text-gray-500 transition-colors">
                <a className="underline" href={href} rel="follow referrer noopener">
                  Enmendar mis errores e ir a Fraccional.cl
                </a>
                {" 👈"}
              </span>
            </p>
          </div>

          <div className="mt-20">
            <a className="underline" href={href}>
              <Image className="" src={img_meme_hormiga} alt="Meme de la hormiga con un palo" />
            </a>
            <p className="text-gray-500 text-sm mt-1">Somos ese</p>
          </div>

          <div className="mt-20 space-y-4">
            <a
              className="block w-full text-yellow-500 text-center underline"
              href={href}
              rel="follow referrer noopener"
            >
              Ir a Fraccional.cl
            </a>
            <a
              className="block w-full text-gray-500 text-center"
              href={"https://github.com/urvana/fraccionar"}
              rel="follow referrer noopener"
            >
              Ver código en GitHub
            </a>
          </div>
        </header>
      </section>
    </main>
  );
}
