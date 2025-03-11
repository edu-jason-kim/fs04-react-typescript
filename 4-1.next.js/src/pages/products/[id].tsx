import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  imgUrl: string;
}

interface Props {
  product: Product;
}

// 정적 페이지를 생성하는 함수
export const getStaticPaths = (async () => {
  const res = await fetch("https://learn.codeit.kr/api/codeitmall/products/");
  const data = await res.json();
  const products: Product[] = data.results;
  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;

// 사용자가 페이지에 접속했을 때, product 정보를 미리 정의해서 컴포넌트에 props를 넘겨주는 함수
export const getStaticProps: GetStaticProps = async (context) => {
  const productId = context.params?.["id"];

  if (!productId) {
    return {
      notFound: true,
    };
  }

  let product;
  try {
    const res = await fetch(
      `https://learn.codeit.kr/api/codeitmall/products/${productId}`
    );
    const data = await res.json();
    product = data;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default function ProductPage({ product }: Props) {
  return (
    <div>
      <h1>{product.name}</h1>
      <Image src={product.imgUrl} width="480" height="480" alt={product.name} />
    </div>
  );
}
