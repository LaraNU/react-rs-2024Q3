import { wrapper } from "./store/store";
import { useRouter } from "next/router";

const App = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/some-other-page");
  };

  return <button onClick={handleNavigation}>Go to Another Page</button>;
};

export default wrapper.withRedux(App);
