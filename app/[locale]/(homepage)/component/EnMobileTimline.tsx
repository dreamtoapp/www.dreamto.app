"use client";
import React from "react";
import { Timeline, Panel } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Import RSuite styles
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
      <Timeline className="max-w-4xl w-full">
        {mobileAppPhases.map((phase, index) => (
          <Timeline.Item key={index}>
            <TimelineCard phase={phase} index={index} t={t} />
          </Timeline.Item>
        ))}
      </Timeline>
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
      <Panel
        shaded
        bordered
        bodyFill
        className="w-full  bg-mute/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
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
        <Panel className="p-4">
          <p className="text-gray-600">{t(phase.description)}</p>
        </Panel>
      </Panel>
    </motion.div>
  );
};

export default EnMobileTimeLine;
