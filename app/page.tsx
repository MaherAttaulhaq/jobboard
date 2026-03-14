import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <header
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
        data-purpose="site-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                QuickHire
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                className="text-slate-600 hover:text-primary font-medium"
                href="/Jobs"
              >
                Find Jobs
              </Link>
              <a
                className="text-slate-600 hover:text-primary font-medium"
                href="#"
              >
                Browse Companies
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <a className="text-primary font-semibold px-4 py-2" href="#">
                Login
              </a>
              <a
                className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                href="#"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden pt-12 lg:pt-20 pb-20 lg:pb-32 bg-secondary"
          data-purpose="hero-banner"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                  Discover <br /> more than <br />
                  <span className="text-primary highlight-underline">
                    5000+ Jobs
                  </span>
                </h1>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
                  Great platform for the job seeker that searching for new
                  career heights and passionate about startups.
                </p>

                <div className="bg-white p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2 border border-gray-100">
                  <div className="flex-1 flex items-center px-4 border-r border-gray-100">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                    <Input
                      className="w-full border-none focus-visible:ring-0 text-slate-700 shadow-none"
                      placeholder="Job title or keyword"
                      type="text"
                    />
                  </div>
                  <div className="flex-1 flex items-center px-4">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                    <select className="w-full border-none focus:ring-0 text-slate-700 bg-transparent">
                      <option>Florence, Italy</option>
                      <option>New York, USA</option>
                      <option>London, UK</option>
                    </select>
                  </div>
                  <Button
                    className="px-8 py-4 rounded-lg font-bold transition-all"
                    size="lg"
                  >
                    Search my job
                  </Button>
                </div>
                <p className="mt-4 text-sm text-slate-400">
                  Popular : UI Designer, UX Researcher, Android, Admin
                </p>
              </div>

              <div className="relative hidden lg:block">
                <img
                  alt="Professional worker"
                  className="w-full h-auto object-contain rounded-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXotk_A6jfEdDrIX0NAIW3oKnzUm399LxFw8GsAnODmHRFmm8U_bG77K_ccQqUr1hFVJbGFM0bP92etLLgEfQkSVJ2PjHxNLrn8E_Xi7h6HhsfxxFlA0WBuaRKnuteXUB9eAMt5ycKYHSixXLVe1VcvCmHsGLP5QD5BejAuCIMrEV9N8WxNI7EZH4DOQrPLQdf5CFWfvuclIz18E9rzy_2PAi4KkiebJj3hqck9ZYvZK9lc4DDIszKhehb1K41LSsYx0n-Znwuqso"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-12 border-b border-gray-100"
          data-purpose="client-logos"
        >
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-400 text-sm font-medium mb-8">
              Companies we helped grow
            </p>
            <div className="flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale">
              <img
                alt="Vodafone"
                className="h-8"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV2_bfycK-gc9vPahNLYpJ4lc6RejX6m8aTl3LniuEZfZd2c2rcnf5hLDr9sCuZ1YQbufpK5_K1wFLZcXfpWL-jumHCMcE3K2RiQxgKgeNTZz7dQKfaBgb-VMPe3yccFcXkOBoNvY_zg1vMwuA44OTqWcIch7MJCnjl94DtqkpoUnjlPYMDzaQO0F7RqhfQJ6HANxgN5njtbxUxa0RM77GXL_QgLdiYeeyl96xalYjMDXS6j9g6gCauf4p8KCOFHI1qmab7EPIuSo"
              />
              <img
                alt="Intel"
                className="h-8"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpS7Jh9iYvSrt-AIYEdPhIYPfSCv9jJ0fv5Oj9Vf3Yyz1lR3cJJETBjmYnxfjWZ6dv6aWlSH31ABuWhk9-g5wdz0Z0LaDmgJDaZbuEf_uN-zP8MoZRNuzpgLY_p-I41JFYPcmXOhrxJSw87G18rkyQLCZmZNsBx9qNKed-C_HvH3IrTygJT3KGC3wkqgnrr3kEU9wPAaCnJEhGu2jvM9-giiCQCXlrhT8fsR5SExhS2v7VAmaHRsFyjDgJsZGQ5ntCfVnpk-yHkl8"
              />
              <img
                alt="Tesla"
                className="h-6"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6FEYZ9bGTxswNrTrUludHS2Zgr659QDe_JvwasjnV4H2WLn_-Efj9VU3HMfwKxo6zvCqm1x8GOGxEprge-AwrrOpNUBkutTend8Yj1VCxin61K7yDqZV4ScmU2agv7EcY3W6pX96f2-tyELkblIFy7Oz4hBBQiTWFJhFusQ2yn0bWj_7C1Uif0a5d0RTAl0n1Z8Bj7_iia1SYo8meUBtqbYysqOhrLWWKOV7COjm8bZnZgptb_zjmEtS3Z-XTfcq7DQ3xTplynZg"
              />
              <img
                alt="AMD"
                className="h-8"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3X2qtTBw_b4sP6aE3xZfrrimBB4mZUC2rJZA5C1FEpe4gwAwCOXszq_6BrR6WC4hFigFfGgX1VecqS-NXt5Wrn8XZVHLE0JLsbiUu-OnQv_v_tLIAJVrfZAF_MCeFWzQWRP4IXkkEL-m6VJbr7w-o_d8UemY0_8oBSo5VCl2K2moDhI8Jwg6_zSFU41u6XzZ4Z40XUQT73pe6fD7BPkpaXYUuzj7SVV3Qj3j94etjvvcWTS4ukvHsc1wHlInSDuCFke32xDn_gns"
              />
              <img
                alt="Talkit"
                className="h-8"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_tUGZ7sRLUQdAg-Buzj-ijsJLeu3TlKvfgUMeioJ7_eeAUNSlrKT2mMoKS6VODVB3lgjiSjQMThCkDe8RWQEZX-dWPbAjSIhnYUeD19hmsTEhXb6mdYXZ2xZnqUdPj6DIHkBTJbWbxaE-dET8YFzqTvGSSGxDUCoqUskDtBIQbD7V2iLiT4b3HpazF3Vx5x2EpQjdKEW_AIvNkzBbVz7ICMWueGZ9orDPBiCZn4ADTGA0-0ZoOUjh-4LZdxdWJ8eg6gqtYsHxYuI"
              />
            </div>
          </div>
        </section>

        <section className="py-24" data-purpose="job-categories">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-bold text-slate-900">
                Explore by <span className="text-primary">category</span>
              </h2>
              <a
                className="text-primary font-semibold flex items-center gap-2"
                href="#"
              >
                Show all jobs{" "}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Design</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>235 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sales</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>756 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 bg-primary text-white rounded-xl shadow-xl transition-all cursor-pointer scale-105 z-10">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Marketing</h3>
                <div className="flex items-center justify-between text-white/70">
                  <span>140 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Finance</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>325 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Technology</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>436 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Engineering</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>542 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Business</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>211 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl hover:border-primary transition-all cursor-pointer card-shadow bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Human Resource</h3>
                <div className="flex items-center justify-between text-slate-400">
                  <span>346 jobs available</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="max-w-7xl mx-auto px-4 mb-24"
          data-purpose="cta-banner"
        >
          <div className="bg-primary rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="p-12 lg:p-20 flex-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Start posting <br /> jobs today
              </h2>
              <p className="text-indigo-100 text-lg mb-10">
                Start posting jobs for only $10.
              </p>
              <Button
                className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                size="lg"
              >
                Sign Up For Free
              </Button>
            </div>
            <div className="flex-1 w-full lg:w-1/2 p-12 lg:pr-0">
              <img
                alt="Dashboard Preview"
                className="rounded-tl-2xl shadow-2xl translate-x-12 translate-y-12 lg:translate-y-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvsIwRBe96vTjoQuzscagKaV6UoYukNX6f78Gapiuu5hz818ZzapEmNSVCMAOkwIQi-Ag_8wPonhvvsc287dZKuzsHnUiGYN1l9ZsufCoAojNbASg-aUCQEafeTBan--K_KqaKA2DmjVx_hNd0RIP7JCFvNyTsIG_6nJl0j-w1PX2spO6620ntHOwAgBy-3yx6XU1d-_Qzft9whQH6prbypzWn96dS1SMUUvPA_iQyMJ67kj1NyBCLvOVzpwNTQJYytTVt7WbS-80"
              />
            </div>
          </div>
        </section>

        <section
          className="py-24 bg-gray-50/50"
          data-purpose="featured-job-listings"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-bold text-slate-900">
                Featured <span className="text-primary">jobs</span>
              </h2>
              <a
                className="text-primary font-semibold flex items-center gap-2"
                href="#"
              >
                Show all jobs{" "}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 card-shadow">
                <div className="flex justify-between items-start mb-6">
                  <img
                    alt="Revolut"
                    className="w-10 h-10 rounded"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC72jZcyYomkObUP6qZoStFUWJWusHCu1w-d9W3Hto1M-kGkeVRnzbE9pRi8Y9DXuxUojsrdhltjj4XWaO0FLcV3XsmDSJIySXcEJ3W6Tk1aSVB7P4W2fj0plLaBdVs3rsLZH1AmffThLDwRh9KTNsXiUrAN01DTuBfOmkAs4GK1BJnnLJVzGtHa8YpN6yENKx4aGCkQPgE6SwP51eWdNscD30nXabXguJalnnMIuOX4f_YgrQj-0iREScIuWYXQevESOaeUWoJAu4"
                  />
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-xs font-bold rounded">
                    Full Time
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">Email Marketing</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Revolut • Madrid, Spain
                </p>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                  Revolut is looking for Email Marketing to help team ma...
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 card-shadow">
                <div className="flex justify-between items-start mb-6">
                  <img
                    alt="Dropbox"
                    className="w-10 h-10 rounded"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu2T6KImQmS1Qpt1B70lO3igt3JivZUxb9CrsSggXWpLrLFEDgSb00J3JJBuofi0K8uEK521e1nIKztlVMTnfF8-k_MB7sjmWFlGiKSuk_vpIAaEJBXiTNP5DULzSKNOwjzqZonZr3sBWzMlMLfh6pzGrIlsgaVH7KyF3miOTvH73Qz0nQa0ZffcPmLhwi4uJT4fZe-FXW11I6jJyNa9ThAD7yB2ON6kB5KI_wwFvAnXB_g2aINI2R8tmEYr0qheR5ow4idxtJrVs"
                  />
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-xs font-bold rounded">
                    Full Time
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">Brand Designer</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Dropbox • San Fransisco, US
                </p>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                  Dropbox is looking for Brand Designer to help the team t...
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">
                    Business
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 card-shadow">
                <div className="flex justify-between items-start mb-6">
                  <img
                    alt="Pitch"
                    className="w-10 h-10 rounded"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ROjsssbrYogmArP_6Z8OQBqWw19b63vk8veAvbi5MPoCxSI02PB89x-CiMgAdpuBRzBwLMfkBSwggfUoummCSXu5dTFLffs23wiOFrCnFxWCyHQN4slK9_xJTV1Vj9VHn-WZmVjWiZld19Rt6JSInLruF8UP_XBN5sdg5N_jz7vzZq6ivjHodEgLVrDXl5CCLi2T8HHcf6_iPY14JBAZPI_g4USdvBR64rtQDq2e-4uz1wkieoRwxz4ZK5qOGsfpQd0LaBccy-k"
                  />
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-xs font-bold rounded">
                    Full Time
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">Email Marketing</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Pitch • Berlin, Germany
                </p>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                  Pitch is looking for Customer Manager to join marketing t...
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 card-shadow">
                <div className="flex justify-between items-start mb-6">
                  <img
                    alt="Blinklist"
                    className="w-10 h-10 rounded"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeLTIfLIPTCRP3B65QAD3-C3W7XZDuuMbu7lt7pDZX0Th0k3T5WUdBXABhsAL3CT_95U6lvvzyb6h9jpPdljF57RiM-xe-psNFzbDpVqm1gS6_rG35YqAzm_sSB_3CK3OWtIPV1ep5KUNz1FOMuHk527p5PqgNF1HciRGgdWXPbU8sXd4u6XaPOIFPkzef9JkwZBFQc3qylJWeP-xh-jMaWdoPC7FjIQvw8-1w_NlBuRzRfg4bQi48IYZdn-OdR3NsyW-DKkDrNS4"
                  />
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-xs font-bold rounded">
                    Full Time
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">Visual Designer</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Blinklist • Granada, Spain
                </p>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                  Blinklist is looking for Visual Designer to help team desi...
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24" data-purpose="latest-job-list">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-bold text-slate-900">
                Latest <span className="text-primary">jobs open</span>
              </h2>
              <a
                className="text-primary font-semibold flex items-center gap-2"
                href="#"
              >
                Show all jobs{" "}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img
                  alt="Nomad"
                  className="w-12 h-12 rounded-lg mr-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-N3VqIGQoNGdKFItchbN3ncTSSqKo4U8jBoTK9ioBQfgOLXWU8Fkg7Z1_2Pya9sZ6SVBW5Yz_xIYmPyQbJz4Ii7VA5bAikCOciK7f8ARjk-oIRVe889HZC1phdEdKr21qAKIHX3vtWLmbPY1Lqb8qSFeQlpnl28FD6LtZSkGtV8SRVON0HFyocNFz25wpEC0KYaDQpNlSLq8L0C_ur2VL7wgbSLCev4-hyng9aWHCwh_IJbMT6nA-PnWIPt5CH_9MTpRrtBi0CWg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Social Media Assistant</h3>
                  <p className="text-sm text-slate-400">
                    Nomad • Paris, France
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 border border-yellow-200 text-yellow-600 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 border border-teal-200 text-teal-600 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img
                  alt="Netlify"
                  className="w-12 h-12 rounded-lg mr-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiUF9a4C92W18EzNnzsY6QSt8Pg49RP24p2MGJBqd6thCQYbIV_mGiH8Wyn-GulLuk0b9_2JVfUxq6QpoYjfYOps8kXtlQ84WPYBiLIeb9kChucUVCoOlcO6TjoZtKLz3d8TGfaf1gK6Siz8mAuOmTMW0y-wuoVZ5fTZC8Zx2k5vBuvJaeDnAT8ZjDkH0c6FJLsadYXGgZIYLXbi9-x9bAmhZcBz_KVUSc8JPcKZz1OAqg1tJIF8MRCtLK8loYYvTyaXKe_F-M2cE"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Social Media Assistant</h3>
                  <p className="text-sm text-slate-400">
                    Netlify • Paris, France
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 border border-yellow-200 text-yellow-600 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 border border-teal-200 text-teal-600 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img
                  alt="Dropbox"
                  className="w-12 h-12 rounded-lg mr-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUNYhTbRTUBGUXFZokyRcwQYVclXqeuDg8qKQLGDYSNky1RIgsnSjKzRrsWzKWQpOcVEd218iY-yErILms8cv2aLkWpV-e2cpDBBhVoEbwQdfTQ8SykNLwMaZ3ZCC4jPjnY7YP2P4JHDG8R9lWQaskDMe5Vlo7k9piNWBuQorcouYVfRFuaNnrbLD26oj2exLszNVe5npfyho4E1mhvAnuNRuWJGR2Kgeo1yvRUDsNE_jNtCSTUPunWOjGjUZf1mrz3BfaNREdP5o"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Brand Designer</h3>
                  <p className="text-sm text-slate-400">
                    Dropbox • San Fransisco, USA
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 border border-yellow-200 text-yellow-600 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 border border-teal-200 text-teal-600 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img
                  alt="Maze"
                  className="w-12 h-12 rounded-lg mr-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALNnIiJsoL4gLwgg0YqmSmQeqxCCpYsi13sCXmr0I7D5GSUSKB6xK0BvMzU-A704CaXVGQ-D9OTgYVMwKeSkaxlBayChXc9jK0Xf6jaonB0tbnqlAdrhCH-t8BzG98Nfh0TQIMat99DyQ5DjwzVsIcchWn-g_R-DR5iS8TBeP0yRPzV-q1CrqfV18NZC2utEOVJwgIfo2PEdFYJhdqEhRu1Id0OXbMW-hiHziRJvUdzSZSiIezu45wSdIYl0_Dxm6NTiikGaolitU"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Brand Designer</h3>
                  <p className="text-sm text-slate-400">
                    Maze • San Fransisco, USA
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 border border-yellow-200 text-yellow-600 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 border border-teal-200 text-teal-600 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img
                  alt="Terraform"
                  className="w-12 h-12 rounded-lg mr-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6jFMtLmkRSMYITFyavr69kplbzfoCwGbTmW_1j4daWlwhhADW1eATFK5jVhx9M2Fmm5A5u3CrMKUSQZTKLs9cJmowu5x-tGFf7Fzcf3DyAxHOxaQqEgpJSZ1rgT4t3UstDAcOOWiEfOabjTJhW6oDHnY5Gb7xqzf4LOD_Jt6H1QPgGphS7__7B_DXEXfgDiQlHNq61ILbcJtfAt4wxvjrAPMYi9YHJ1VAxBrwvzXfW6BW780MWsGdCcMVNxtz0I8R4SVFOjQiFyo"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Interactive Developer</h3>
                  <p className="text-sm text-slate-400">
                    Terraform • Hamburg, Germany
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 border border-yellow-200 text-yellow-600 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 border border-teal-200 text-teal-600 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <img
                  alt="Udacity"
                  className="w-12 h-12 rounded-lg mr-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5ItMdUG5zBcdRlYILPcuKSsmjyiWEV0xZGGf6Uq_If9b1_FUWtw5rOjPprM5NZf9V07R-rx8nvXcE39-XQ-eteaW2IWv5BsmMyZXltM3igLRdnTCc1gxtXs3EA5Q3aNBAclM8JSeuoGHUKhX_z5geA6D3XuSSllHAfN9nnLflZLLlp9TDkMNW_ZvUDRAtVXLynT1jCl6VAZ6Nj9InHNETEZLKiOQbUtBg7PfZV2zgbRNNrMr9nZetxv456JyvXOVtV9dbC8uvR4M"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Interactive Developer</h3>
                  <p className="text-sm text-slate-400">
                    Udacity • Hamburg, Germany
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 border border-yellow-200 text-yellow-600 text-[10px] font-bold rounded-full">
                    Marketing
                  </span>
                  <span className="px-3 py-1 border border-teal-200 text-teal-600 text-[10px] font-bold rounded-full">
                    Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="bg-dark text-white pt-24 pb-12"
        data-purpose="site-footer"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  QuickHire
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-xs">
                Great platform for the job seeker that searching for new career
                heights. Find your dream job easier.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">About</h4>
              <ul className="space-y-4 text-slate-400">
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Companies
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Terms
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Advice
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Resources</h4>
              <ul className="space-y-4 text-slate-400">
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Help Docs
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Guide
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Updates
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Get job notifications</h4>
              <p className="text-slate-400 mb-6">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <div className="flex">
                <Input
                  className="bg-white text-slate-900 border-none rounded-none rounded-l-md w-full px-4 py-3 focus-visible:ring-0 shadow-none"
                  placeholder="Email Address"
                  type="email"
                />
                <Button className="px-6 py-3 rounded-r-md font-bold transition-colors rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              2021 @ QuickHire. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a className="text-slate-500 hover:text-white" href="#">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a className="text-slate-500 hover:text-white" href="#">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441c.795 0 1.439-.645 1.439-1.441s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a className="text-slate-500 hover:text-white" href="#">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
