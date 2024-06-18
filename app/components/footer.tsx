import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-custom-gradient text-purple-light font-dm-sans">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 xs:py-3 sm:py-5">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4"></div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
          <a
            href="https://urani.trade"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-between">
              {/* <Image
                src="assets/logos/skate/svg/dark-bg.svg"
                alt="Urani Logo"
                className="mr-6"
                width={60}
                height={39.33}
                priority
              /> */}
              <span className="text-base/6 font-medium text-zinc-950 sm:text-sm/5">
               Think Infinite © Urani, Inc. 2024
              </span>
            </div>
          </a>
          <div className="flex flex-col sm:flex-row items-center order-2 sm:order-1">
            <div className="flex sm:justify-center items-center mb-3 sm:mb-0 ">
              <a
                href="https://urani.trade"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-base/6 font-medium text-zinc-950 sm:text-sm/5 mr-4"
              >
                <span>Labs</span>
              </a>
              <a
                href="https://arena.urani.ag/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-base/6 font-medium text-zinc-950 sm:text-sm/5"
              >
                <span>Arena</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
