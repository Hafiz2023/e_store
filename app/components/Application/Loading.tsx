import Image from "next/image";
import loading from "@/public/assets/images/loading.svg";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/app/store/store";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-start mt-12">
      <Image src={loading.src} height={80} width={50} alt="Loading" />
      <PersistGate persistor={persistor} loading={<Loading />}></PersistGate>
    </div>
  );
};

export default Loading;
