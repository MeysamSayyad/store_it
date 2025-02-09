"use client";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex min-h-screen">
      <section className=" w-1/2 hidden items-center justify-center lg:flex xl:w-2/5 bg-brand p-10">
        <div className=" flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          />
          <div className=" space-y-5 text-white">
            <h1 className=" h1 ">Manage Your files the best way</h1>
            <p>this is a place where you can store all your documents</p>{" "}
          </div>
          <Image
            src="/assets/images/files.png"
            alt="files"
            width={342}
            height={342}
            className=" transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className=" flex flex-1 flex-col items-center lg:justify-center bg-white p-4 py-10 lg:p-10 lg:py-0">
        <div className=" mb-16 lg:hidden">
          <Image
            alt="logo"
            src="/assets/icons/logo-full-brand.svg"
            width={224}
            height={82}
            className=" h-auto w-[200px] lg:w-[250px] "
          />
        </div>
        {children}
      </section>
    </div>
  );
};
export default Layout;
