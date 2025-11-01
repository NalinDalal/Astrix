import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;
  return (
    <>
      <Image {...rest} src={srcLight} className={styles.imgLight} />
      <Image {...rest} src={srcDark} className={styles.imgDark} />
    </>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30">
    <div className="text-5xl mb-4 inline-block animate-bounce">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center p-6 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20">
    <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
      {value}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
      {label}
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-x-hidden">
      {/* Background Gradient */}
      <div className="fixed top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-50"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center py-16 sm:py-24 space-y-8 animate-fade-in-up">
          <div className={`mb-8 ${styles.float}`}>
            <ThemeImage
              srcLight="/astrix-light.svg"
              srcDark="/astrix-dark.svg"
              alt="Astrix logo"
              width={240}
              height={60}
              priority
              className="mx-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Welcome to{" "}
            <span
              className={`bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent ${styles.gradientShift}`}
            >
              Astrix
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate online gaming and luck simulation platform — built for
            learning, designed for thrill.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              appName="Astrix"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              🎲 Try Your Luck
            </Button>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Features
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
            <StatCard value="100%" label="Virtual Fun" />
            <StatCard value="0$" label="Real Money" />
            <StatCard value="∞" label="Learning" />
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Why Choose Astrix?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the thrill of chance in a safe, educational environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🎰"
              title="Real-time Simulation"
              description="Advanced probability algorithms that mirror real casino mechanics with complete transparency"
            />
            <FeatureCard
              icon="💰"
              title="Virtual Economy"
              description="Earn, spend, and manage virtual coins without any financial risk or real-world transactions"
            />
            <FeatureCard
              icon="🧠"
              title="Educational Insights"
              description="Learn about probability, statistics, and game theory through interactive experiences"
            />
            <FeatureCard
              icon="⚡"
              title="Modern Tech Stack"
              description="Built with Next.js 15, Turborepo, TypeScript, and cutting-edge web technologies"
            />
            <FeatureCard
              icon="🎨"
              title="Beautiful UI/UX"
              description="Stunning dark/light themes with smooth animations and responsive design"
            />
            <FeatureCard
              icon="🔒"
              title="100% Safe"
              description="No gambling, no real money, no risk — just pure entertainment and learning"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-8 sm:p-12 space-y-6">
            <h2 className="text-4xl font-bold mb-6">About the Project</h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Astrix is a sophisticated demo gambling-style platform created as
              a college assignment to showcase modern web development practices.
              This project demonstrates full-stack capabilities including:
            </p>

            <ul className="space-y-3">
              {[
                "Advanced UI/UX design with theme support",
                "RESTful API integration and state management",
                "Real-time probability calculations",
                "Monorepo architecture with Turborepo",
                "TypeScript for type-safe development",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-lg">
                  <span className="text-purple-600 font-bold mt-1">→</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mt-8">
              <p className="text-gray-800 dark:text-gray-200">
                ⚠️ <strong>Educational Purpose Only:</strong> No real money
                transactions, completely safe for learning and experimentation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ready to Roll the Dice?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start your journey into the world of probability and chance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              appName="Astrix"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started Now
            </Button>
            <a
              href="https://github.com/nalindalal/astrix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-black dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <span>⭐</span> View on GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Astrix</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gambling simulation platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Tech Stack</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Next.js 15</li>
                <li>Turborepo</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/yourusername/astrix"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://nextjs.org/"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Next.js
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} Astrix Demo Project. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
