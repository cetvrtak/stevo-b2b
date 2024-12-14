import { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((c) => c + 1);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return <h2>{`Loading${String('.').repeat(counter % 4)}`}</h2>;
};

export default Loader;
