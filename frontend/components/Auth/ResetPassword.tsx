"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPassword = ({ token }: { token: string }) => {
  const [data, setData] = useState({
    password: "",
  });
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(`/api/forget-password/verify-token`, {
          token,
        });

        if (res.status === 200) {
          setUser({
            email: res.data.email,
          });
          setVerified(true);
        }
      } catch (error) {
        toast.error(error.response.data);
        router.push("/auth/forget-password");
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === "") {
      toast.error("Please enter your password.");
      return;
    } 

    try {
      const res = await axios.post(`/api/forget-password/update`, {
        email: user?.email,
        password: data.password,
      });

      if (res.status === 200) {
        toast.success(res.data);
        setVerified(true);
        setData({ password: "" });
        router.push("/auth/signin");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <div className="mb-15 ">
              <h1 className="mb-1.5 text-center text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
                Update Password
              </h1>

              <p className="text-body-color text-center md:px-20">
                Enter your new password
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2  pb-7.5  lg:justify-between">
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                  className={`w-full border-b border-stroke !bg-white px-2 py-1 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white`}
                />

                <button
                  aria-label="login with email and password"
                  className={`mx-auto mt-5 inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${
                    error.length > 0 || !data.password
                      ? "bg-gray-600"
                      : "bg-black  "
                  }`}
                  type="submit"
                
                >
                  Save Password
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>

                {error.length > 0 && <p className="text-red-500">{error}</p>}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default ResetPassword;
