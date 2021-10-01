import Layout from '../../components/Layout'


export default function primer_post({ data }) {
    return (
        <Layout
            title="Post"
        >
            <h1>{data.id} - {data.title}</h1>
            <p>{data.body}</p>
        </Layout>
    )
}
//Generar url dinamica
export async function getStaticPaths() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));
      return {
        paths,
        fallback: false, //Error 404 por defaul
      };
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function getStaticProps({ params }) {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + params.id
      );
      const data = await res.json();
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }