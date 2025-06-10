import Layout from "@components/Layout";
import Button from "@components/ui/Button";

function App() {
  return (
    <Layout>
      <Button action={() => console.log("Clicked")}>Click Me</Button>
      <span>App</span>
    </Layout>
  );
}

export default App;
