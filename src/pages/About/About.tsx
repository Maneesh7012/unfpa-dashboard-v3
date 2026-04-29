import React from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';

const AboutPage: React.FC = () => {
  return (
    <PageWrapper title="About the Project">
      <div className="w-full pb-12 pt-0 px-6">
        <div className="space-y-10">
          {/* Main Content Section */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium border-l-4 border-[#F96000] pl-8 py-2">
              The Odisha Demographic & Data Intelligence Platform is an
              open-source web initiative by the UNFPA India (Odisha State
              Office), designed to modernize how demographic trends are
              understood, analyzed, and acted upon across the state of Odisha.
            </p>

            <div className="grid grid-cols-1 gap-10 text-gray-600 text-lg leading-relaxed font-light">
              <p className="font-normal">
                Traditional census data, while authoritative, is collected only
                once every ten years — a cadence that struggles to keep pace
                with the rapid socio-economic shifts shaping communities today.
                This platform bridges that gap by combining historical census
                records with satellite imagery and machine learning, offering a
                dynamic, near real-time view of population patterns that can
                support more responsive governance and planning.
              </p>

              <p className="font-normal">
                At its core, the platform translates complex geospatial and
                demographic data into clear, interactive visualizations. By
                analyzing satellite imagery alongside official population
                records, advanced machine learning models uncover meaningful
                relationships between physical landscape changes and human
                settlement patterns. These models power insights into where
                people live, how communities are expanding or contracting, and
                how resources might be more equitably distributed. The result is
                a decision-support tool that turns raw data into actionable
                intelligence for policymakers, planners, researchers, and the
                public alike.
              </p>

              <p className="font-normal">
                The initiative is structured around six interconnected stages:
                data acquisition and preprocessing, correlation evaluation,
                geospatial analysis, predictive modeling, visualization and
                interpretation, and integration into a user-friendly web
                interface. Each stage builds upon the last — beginning with the
                collection of cloud-free satellite imagery and census data,
                progressing through algorithmic pattern recognition and spatial
                analysis, and culminating in forecasts that project demographic
                trends into the future. Districts are categorized as
                fast-growing, stable, or declining, helping prioritize where
                infrastructure and social programs are needed most.
              </p>

              <p className="font-normal pt-4">
                Aligned with UNFPA's broader mission of harnessing population
                data to advance sustainable development, this platform aims to
                empower the state of Odisha with a forward-looking planning tool
                — one that moves beyond static spreadsheets toward dynamic,
                AI-driven models of demographic health. By making complex
                analysis accessible through an intuitive dashboard with
                interactive maps, custom filters, and a curated research
                library, the initiative ensures that data-driven insights reach
                decision-makers and citizens alike, supporting smarter strategic
                planning, better infrastructure development, and more effective
                social programs across the state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
