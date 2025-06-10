"use client";
import React from "react";
// import { Timeline, Panel } from "rsuite"; // Removed, using native components
// import "rsuite/dist/rsuite.min.css"; // Removed RSuite styles
import { motion, useInView } from "framer-motion"; // Import Framer Motion
import { Icon, IconifyIcon } from "@iconify/react"; // Import Iconify
import { useTranslations } from "next-intl";

// Import icons one by one
import IconChartBar from "@iconify/icons-tabler/chart-bar";
import IconCode from "@iconify/icons-tabler/code";
import IconDeviceMobile from "@iconify/icons-tabler/device-mobile";
import IconRocket from "@iconify/icons-tabler/rocket";
import IconSettings from "@iconify/icons-tabler/settings";
import IconTestPipe from "@iconify/icons-tabler/test-pipe";
import IconUsers from "@iconify/icons-tabler/users";

// Define TypeScript types
type MobileAppPhase = {
  title: string;
  description: string;
  icon: IconifyIcon; // Iconify icon object
  date: string;
};

type TimelineCardProps = {
  phase: MobileAppPhase;
  index: number;
};

// Mobile app phases data
const mobileAppPhases: MobileAppPhase[] = [
  {
    title: "discoveryPlanningTitle",
    description: "discoveryPlanningDescription",
    icon: IconChartBar,
    date: "Phase 1",
  },
  {
    title: "uiUxDesignTitle",
    description: "uiUxDesignDescription",
    icon: IconDeviceMobile,
    date: "Phase 2",
  },
  {
    title: "developmentTitle",
    description: "developmentDescription",
    icon: IconCode,
    date: "Phase 3",
  },
  {
    title: "testingQATitle",
    description: "testingQADescription",
    icon: IconTestPipe,
    date: "Phase 4",
  },
  {
    title: "deploymentTitle",
    description: "deploymentDescription",
    icon: IconRocket,
    date: "Phase 5",
  },
  {
    title: "maintenanceUpdatesTitle",
    description: "maintenanceUpdatesDescription",
    icon: IconSettings,
    date: "Phase 6",
  },
  {
    title: "userFeedbackIterationTitle",
    description: "userFeedbackIterationDescription",
    icon: IconUsers,
    date: "Phase 7",
  },
];

const EnMobileTimeLine: React.FC = () => {
  const t = useTranslations("mobileAppPhases");
  return (
    <div className="flex justify-center p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl w-full flex flex-col gap-8 relative">
  {/* Timeline vertical line */}
  <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-100 rounded-full z-0 hidden sm:block" />
  {mobileAppPhases.map((phase, index) => (
    <div key={index} className="relative z-10">
      <TimelineCard phase={phase} index={index} t={t} />
    </div>
  ))}
</div>
    </div>
  );
};

const TimelineCard: React.FC<TimelineCardProps & { t: any }> = ({
  phase,
  index,
  t,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="w-full bg-mute/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
  <div className="p-4 flex items-center space-x-4">
    <div className="p-3 bg-blue-50 rounded-full">
      <Icon icon={phase.icon} className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        {t(phase.title)}
      </h3>
      <p className="text-sm text-gray-500">{phase.date}</p>
    </div>
  </div>
  <div className="p-4 border-t border-gray-100">
    <p className="text-gray-600">{t(phase.description)}</p>
  </div>
</div>
    </motion.div>
  );
};

export default EnMobileTimeLine;
