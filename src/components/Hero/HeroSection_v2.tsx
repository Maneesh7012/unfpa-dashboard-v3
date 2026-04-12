'use client';

import { motion } from 'framer-motion';
import { StatCard } from './shared';

import bg from '../../assets/images/odisha-bg.svg';

export function HeroSection_v2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full overflow-hidden rounded-none"
    >
      {/* ---------- BACKGROUND (placeholder) ---------- */}
      <div className="absolute inset-0 z-0">
        {/* Replace this with your actual bg */}

        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #235E83 0%, rgba(35,94,131,0.85) 25%, rgba(249,96,0,0.7) 50%, rgba(249,96,0,0.4) 75%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-10 px-6 md:px-10 py-10 text-white">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] max-w-4xl">
          Enabling Insights into{' '}
          <span className="text-white/90">
            Odisha’s Evolving Demographic Landscape
          </span>
        </h1>

        {/* Paragraphs */}
        <div className="mt-6 max-w-4xl space-y-4 text-sm md:text-[15px] leading-relaxed text-white/90">
          <p>
            Odisha, one of India's eastern coastal states, has witnessed steady
            population growth over the past several decades, rising from
            approximately 31.6 million in 1991 to over 41.9 million as recorded
            in the 2011 Census — a growth trajectory that reflects both improved
            healthcare access and declining mortality rates across the state.
            While the overall growth rate has been gradually moderating,
            signaling a demographic transition, the state continues to
            experience significant internal migration, with rural populations
            steadily shifting toward urban centers like Bhubaneswar, Cuttack,
            and Rourkela in search of better livelihoods and opportunities.
          </p>

          <p>
            The demographic landscape of Odisha is also shaped by its rich
            ethnic and tribal diversity, with Scheduled Tribes comprising nearly
            22.8% of the total population — one of the highest proportions among
            Indian states. Improvements in literacy, particularly female
            literacy, alongside declining fertility rates and better maternal
            health outcomes, are reshaping the state's age structure, creating a
            growing youth population that holds immense potential as a
            demographic dividend. These changes present both opportunities and
            challenges for policymakers as they navigate infrastructure
            development, employment generation, and equitable social welfare
            across Odisha's diverse urban and rural communities.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/60 my-8" />

        {/* Stats Row (no card UI, transparent) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            label="Districts"
            value="30"
            sub="Spatially geocoded"
            transparent
          />
          <StatCard
            label="Horizon"
            value="2036"
            sub="Projected timeline"
            transparent
          />
          <StatCard
            label="Target MAPE"
            value="< 5%"
            sub="Model accuracy"
            transparent
          />
          <StatCard
            label="Fusion Layers"
            value="6+"
            sub="Satellite + Admin"
            transparent
          />
        </div>
      </div>
    </motion.div>
  );
}
