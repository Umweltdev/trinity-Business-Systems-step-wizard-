"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Wifi,
  Building,
  Zap,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
// --- TYPE DEFINITIONS ---
type SolutionTypeId = "website" | "trinity" | "both";
type IndustryId =
  | "restaurant"
  | "retail"
  | "services"
  | "hospitality"
  | "property"
  | "other";
type GoalId =
  | "fees"
  | "brand"
  | "automation"
  | "scale"
  | "customers"
  | "insights";
type PlatformTierId = "foundation" | "full" | "premium";
type TrinityOptionId = string;

interface TrinityOption {
  id: TrinityOptionId;
  type: "individual" | "package";
  name: string;
  icon: string;
  description: string;
  betaPrice: number;
  earlyPrice: number;
  standardPrice: number;
  features?: string[];
  includes?: string[];
  savings?: string;
  baseRecommended?: boolean;
  bestValue?: boolean;
  note?: string;
  cancelValue?: number;
}

// --- CONSTANT DATA ---
const ALL_TRINITY_OPTIONS: TrinityOption[] = [
  {
    id: "expense",
    type: "individual",
    name: "Expense Manager",
    icon: "💰",
    description:
      "AI-powered financial planning that ensures you never run out of cash",
    betaPrice: 232,
    earlyPrice: 579,
    standardPrice: 1739,
    cancelValue: 23,
    features: [
      "Predictive cash flow",
      "7 allocation rules",
      "Emergency fund protection",
      "Automatic priority reshuffling",
    ],
  },
  {
    id: "mcd",
    type: "individual",
    name: "MCD System",
    icon: "📈",
    description:
      "Marketing Cost Displacement - automatically adjusts prices based on ad spend",
    betaPrice: 232,
    earlyPrice: 579,
    standardPrice: 1739,
    cancelValue: 23,
    features: [
      "Real-time price optimization",
      "Marketing spend integration",
      "Automatic profit protection",
      "Platform cost tracking",
    ],
  },
  {
    id: "rcd",
    type: "individual",
    name: "RCD System",
    icon: "🎯",
    description:
      "Returning Customer Discounts - creates viral loyalty networks",
    betaPrice: 232,
    earlyPrice: 579,
    standardPrice: 1739,
    cancelValue: 23,
    features: [
      "Automatic loyalty tracking",
      "Viral referral networks",
      "Personalized discount vectors",
      "Lifetime value optimization",
    ],
  },
  {
    id: "garo",
    type: "individual",
    name: "GARO System",
    icon: "🧬",
    description:
      "Genetic Algorithm Restocking Optimizer - evolves perfect inventory decisions",
    betaPrice: 2089,
    earlyPrice: 2439,
    standardPrice: 3599,
    cancelValue: 209,
    features: [
      "500+ generation evolution",
      "Multi-objective fitness scoring",
      "70% stockout reduction",
      "Predictive demand modeling",
    ],
    note: "Physical stores: +€1,600 for Square setup & training",
  },
  {
    id: "aed",
    type: "individual",
    name: "AED System",
    icon: "🚀",
    description:
      "Advertising Efficiency Dashboard - unifies and optimizes all ad platforms",
    betaPrice: 232,
    earlyPrice: 579,
    standardPrice: 1739,
    cancelValue: 23,
    features: [
      "4+ platform integration",
      "Real-time budget reallocation",
      "Machine learning optimization",
      "30% cost reduction average",
    ],
  },
  {
    id: "trinity-core",
    type: "package",
    name: "Trinity Core Package",
    icon: "⚡",
    description: "Essential business intelligence: Expense Manager + MCD + RCD",
    betaPrice: 600,
    earlyPrice: 1500,
    standardPrice: 4500,
    cancelValue: 60,
    includes: ["💰 Expense Manager", "📈 MCD System", "🎯 RCD System"],
    savings: "Save €3,900 vs standard pricing",
    baseRecommended: true,
  },
  {
    id: "trinity-plus",
    type: "package",
    name: "Trinity Plus Package",
    icon: "🌟",
    description: "Complete suite: All 5 systems working in perfect harmony",
    betaPrice: 1159,
    earlyPrice: 2500,
    standardPrice: 7500,
    cancelValue: 116,
    includes: [
      "💰 Expense Manager",
      "📈 MCD System",
      "🎯 RCD System",
      "🧬 GARO System",
      "🚀 AED System",
    ],
    savings: "Save €6,500 vs standard pricing",
    bestValue: true,
    note: "GARO requires +€1,600 for physical stores",
  },
];

// --- MAIN APP COMPONENT ---
const App = () => {
  // const solutionTypes = [
  //   {
  //     id: "trinity",
  //     name: "Trinity Business Systems",
  //     icon: Zap,
  //     description: "AI-powered business intelligence",
  //   },
  // ];

  const industries = [
    {
      id: "restaurant",
      name: "Restaurant & Food",
      icon: "🍽️",
      examples: "Restaurants, Takeaways, Cafes",
    },
    {
      id: "retail",
      name: "Retail & E-commerce",
      icon: "🛍️",
      examples: "Shops, Online Stores, Boutiques",
    },
    {
      id: "services",
      name: "Professional Services",
      icon: "💼",
      examples: "Consulting, Legal, Financial",
    },
    {
      id: "hospitality",
      name: "Hospitality & Events",
      icon: "🏨",
      examples: "Hotels, Venues, Tourism",
    },
    {
      id: "property",
      name: "Property & Real Estate",
      icon: "🏠",
      examples: "Agents, Management, Development",
    },
    {
      id: "other",
      name: "Other Industry",
      icon: "🚀",
      examples: "Tell us about your business",
    },
  ];

  const goals = [
    {
      id: "fees",
      name: "Eliminate Platform Fees",
      icon: "💰",
      description: "Stop paying 20-35% commission",
      savings: "Save £1,000-5,000/month",
    },
    {
      id: "brand",
      name: "Build Brand Identity",
      icon: "🎨",
      description: "Create unique digital presence",
      savings: "73% better brand recall",
    },
    {
      id: "automation",
      name: "Automate Operations",
      icon: "⚡",
      description: "Streamline workflows",
      savings: "15-20 hours/week saved",
    },
    {
      id: "scale",
      name: "Scale Your Business",
      icon: "📈",
      description: "Systems that grow with you",
      savings: "Multi-location ready",
    },
    {
      id: "customers",
      name: "Own Customer Relationships",
      icon: "👥",
      description: "Direct customer connection",
      savings: "Build lasting loyalty",
    },
    {
      id: "insights",
      name: "Data-Driven Decisions",
      icon: "📊",
      description: "Analytics for growth",
      savings: "Real-time dashboards",
    },
  ];

  const platformTiers = useMemo(
    () => [
      {
        id: "foundation",
        name: "Foundation",
        minPrice: 600,
        maxPrice: 1000,
        features: [
          "Professional Website",
          "Mobile Responsive",
          "Basic SEO",
          "Contact Forms",
          "Social Media Links",
        ],
      },
      {
        id: "full",
        name: "Full System",
        minPrice: 1200,
        maxPrice: 2000,
        features: [
          "Everything in Foundation",
          "Complete Ordering System",
          "Customer Database",
          "Email Automation",
          "Payment Processing",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        minPrice: 1800,
        maxPrice: 3000,
        features: [
          "Everything in Full System",
          "Advanced Analytics",
          "Multi-location Support",
          "API Access",
          "AI Predictions",
        ],
      },
    ],
    []
  );

  // Initial state function to load from localStorage
  const getInitialState = () => {
    if (typeof window === "undefined") return {};
    const savedState = localStorage.getItem("quoteBuilderState");
    return savedState ? JSON.parse(savedState) : {};
  };

  const initialState = getInitialState();

  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState(initialState.currentStep || 1);
  const [solutionType, setSolutionType] = useState<SolutionTypeId | null>(
    initialState.solutionType || null
  );
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId | null>(
    initialState.selectedIndustry || null
  );
  const [selectedGoals, setSelectedGoals] = useState<GoalId[]>(
    initialState.selectedGoals || []
  );
  const [trinitySelectionId, setTrinitySelectionId] =
    useState<TrinityOptionId | null>(initialState.trinitySelectionId || null);
  const [selectedTier, setSelectedTier] = useState<PlatformTierId | null>(
    initialState.selectedTier || null
  );
  const [budget, setBudget] = useState(initialState.budget || 5000);
  const [hasPhysicalStore, setHasPhysicalStore] = useState<boolean | null>(
    initialState.hasPhysicalStore || null
  );
  const [showToast, setShowToast] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(
    initialState.hasStarted || false
  );
  // --- AUTO-ADVANCE LOGIC ---
  // Move from Start -> next step automatically when a type is chosen
  useEffect(() => {
    if (currentStep === 1 && solutionType) {
      setCurrentStep(2);
    }
  }, [solutionType, currentStep]);

  // Move from Trinity Package -> next step automatically when a package is selected
  // (moved below nextStep definition to avoid temporal dead zone)

  // Effect to save state to localStorage on any change
  useEffect(() => {
    const stateToSave = {
      currentStep,
      solutionType,
      selectedIndustry,
      selectedGoals,
      trinitySelectionId,
      selectedTier,
      budget,
      hasPhysicalStore,
      hasStarted,
    };
    localStorage.setItem("quoteBuilderState", JSON.stringify(stateToSave));
  }, [
    currentStep,
    solutionType,
    selectedIndustry,
    selectedGoals,
    trinitySelectionId,
    selectedTier,
    budget,
    hasPhysicalStore,
    hasStarted,
  ]);

  const betaDaysRemaining = 10;

  const calculateRunningTotal = useCallback(() => {
    let total = 0;
    const trinitySelection = ALL_TRINITY_OPTIONS.find(
      (opt) => opt.id === trinitySelectionId
    );

    if (trinitySelection) {
      total += trinitySelection.betaPrice;
      if (
        hasPhysicalStore &&
        (trinitySelection.id === "trinity-plus" ||
          trinitySelection.id === "garo")
      ) {
        total += 1600;
      }
    }

    if (selectedTier) {
      const tier = platformTiers.find((t) => t.id === selectedTier);
      if (tier) {
        total += (tier.minPrice + tier.maxPrice) / 2;
      }
    }
    return Math.round(total);
  }, [trinitySelectionId, selectedTier, hasPhysicalStore, platformTiers]);

  const showToastMessage = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  const getSteps = useCallback(() => {
    if (solutionType === "trinity") {
      return ["Start", "Trinity Package", "Store Type", "Review & Purchase"];
    } else if (solutionType === "website") {
      return ["Start", "Industry", "Goals", "Platform Tier", "Review"];
    } else if (solutionType === "both") {
      return [
        "Start",
        "Industry",
        "Trinity Package",
        "Platform Tier",
        "Review",
      ];
    }
    return ["Start"];
  }, [solutionType]);

  const nextStep = useCallback(() => {
    const steps = getSteps();
    if (currentStep < steps.length) {
      let nextStepNum = currentStep + 1;

      const needsStoreInfo =
        trinitySelectionId === "trinity-plus" || trinitySelectionId === "garo";
      if (solutionType === "trinity" && nextStepNum === 3 && !needsStoreInfo) {
        nextStepNum++;
      }

      setCurrentStep(nextStepNum);
      window.scrollTo(0, 0);
    }
  }, [currentStep, getSteps, solutionType, trinitySelectionId]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      let prevStepNum = currentStep - 1;

      const needsStoreInfo =
        trinitySelectionId === "trinity-plus" || trinitySelectionId === "garo";
      if (solutionType === "trinity" && prevStepNum === 3 && !needsStoreInfo) {
        prevStepNum--;
      }

      setCurrentStep(prevStepNum);
      window.scrollTo(0, 0);
    }
  }, [currentStep, solutionType, trinitySelectionId]);

  // Move from Trinity Package -> next step automatically when a package is selected
  useEffect(() => {
    if (solutionType === "trinity" && currentStep === 2 && trinitySelectionId) {
      nextStep();
    }
  }, [solutionType, currentStep, trinitySelectionId, nextStep]);

  // Reset Function
  const resetSelections = () => {
    setCurrentStep(1);
    setSolutionType(null);
    setSelectedIndustry(null);
    setSelectedGoals([]);
    setTrinitySelectionId(null);
    setSelectedTier(null);
    setBudget(5000);
    setHasPhysicalStore(null);
    setHasStarted(false);
    localStorage.removeItem("quoteBuilderState");
    showToastMessage("Selections have been reset.");
  };

  // Dynamic Recommendations Logic
  const recommendations = useMemo(() => {
    let trinityRec: TrinityOptionId = "trinity-core";
    let tierRec: PlatformTierId = "full";

    if (selectedGoals.includes("scale") || selectedIndustry === "retail") {
      trinityRec = "trinity-plus";
    }
    if (
      selectedGoals.includes("automation") &&
      selectedGoals.includes("insights")
    ) {
      tierRec = "premium";
    } else if (selectedGoals.length <= 1 && !selectedGoals.includes("scale")) {
      tierRec = "foundation";
    }
    return { trinityRec, tierRec };
  }, [selectedGoals, selectedIndustry]);

  // --- RENDER LOGIC ---
  const renderStepContent = () => {
    const steps = getSteps();
    const isReviewStep = steps.length > 1 && steps.length === currentStep;

    if (isReviewStep && solutionType) {
      return <FinalSummary />;
    }

    switch (solutionType) {
      case "trinity":
        switch (currentStep) {
          case 1:
            return <SolutionChoice />;
          case 2:
            return <TrinityPackages />;
          case 3:
            return <StoreType />;
          default:
            return null;
        }
      case "website":
        switch (currentStep) {
          case 1:
            return <SolutionChoice />;
          case 2:
            return <IndustryStep />;
          case 3:
            return <GoalsStep />;
          case 4:
            return <PlatformTier />;
          default:
            return null;
        }
      case "both":
        switch (currentStep) {
          case 1:
            return <SolutionChoice />;
          case 2:
            return <IndustryStep />;
          case 3:
            return <TrinityPackages />;
          case 4:
            return <PlatformTier />;
          default:
            return null;
        }
      default:
        return <SolutionChoice />;
    }
  };

  // --- STEP COMPONENTS ---

  const SolutionChoice = () => {
    const handleStartBuilding = () => {
      setSolutionType("trinity");
      setHasStarted(true);
      nextStep();
    };

    return (
      <div className="animate-fadeIn flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-8 ">
        {/* Left Content Section */}
        <div className="md:w-1/2 text-left mb-8 md:mb-0 md:pr-10">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-16 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 ml-4">
              Trinity Calculator Wizard
            </h1>
          </div>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Our Trinity Systems provide cutting-edge automation, financial
            optimization, and customer loyalty solutions tailored specifically
            for your business needs.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Predictive Cash Flow
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Marketing Optimization
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Customer Loyalty
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Inventory Management
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Section */}
        <div className="md:w-1/2 flex flex-col items-center md:items-end md:pl-10 md:pt-10">
          <div className="w-full max-w-xs">
            <button
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
              onClick={handleStartBuilding}
            >
              Start Building Your Solution
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-gray-500 text-sm mt-4 text-center">
              Get a customized quote in just a few minutes
            </p>
          </div>

          {/* Visual element for balance */}
          <div className="mt-8 opacity-60">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    );
  };

  const TrinityPackages = () => (
    <div className="animate-fadeIn">
      {/* Label */}
      <div className="inline-block px-5 py-1.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-700 rounded-full text-sm font-bold mb-6 border border-purple-500/30 shadow-sm tracking-wide">
        ✨ Trinity Systems Selection
      </div>

      {/* Header + Beta Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">
            Choose Your{" "}
            <span
              className="bg-clip-text text-transparent drop-shadow-sm"
              style={{
                backgroundImage:
                  "linear-gradient(102deg, #7B3FF9 0%, #409AFF 60%, #2DD4BF 100%)",
              }}
            >
              Trinity Solution
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Select individual systems or complete packages.{" "}
            <span className="font-semibold text-red-500">Beta pricing</span>{" "}
            ends in {betaDaysRemaining} days!
          </p>
        </div>
        <div className="inline-flex items-center gap-6 px-6 py-3 bg-gradient-to-r from-red-500/10 via-red-400/5 to-red-500/10 border border-red-500/40 rounded-xl shadow-sm">
          <span className="text-red-600 font-bold text-sm tracking-wide animate-pulse">
            🔥 BETA PRICING ACTIVE
          </span>
          <div className="text-center">
            <div className="text-red-600 font-extrabold text-2xl">
              {betaDaysRemaining}
            </div>
            <div className="text-xs text-gray-600 uppercase tracking-wider">
              Days Remaining
            </div>
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {ALL_TRINITY_OPTIONS.map((option) => {
          const isRecommended = recommendations.trinityRec === option.id;
          const isSelected = trinitySelectionId === option.id;

          return (
            <div
              key={option.id}
              className={`group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border shadow-md hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/70 ${
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-400/40"
                  : "border-gray-100 hover:border-blue-300"
              } ${
                option.id === "aed"
                  ? "lg:col-span-2"
                  : option.type === "package"
                  ? "lg:col-span-2"
                  : ""
              }`}
              onClick={() => setTrinitySelectionId(option.id)}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_35%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10" />
              {/* Badges */}
              {isRecommended && !option.bestValue && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-semibold uppercase shadow-md">
                  ⭐ Recommended
                </div>
              )}
              {option.bestValue && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-xs font-semibold uppercase shadow-md">
                  💎 Best Value
                </div>
              )}

              {/* Card Content */}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-600/15 flex items-center justify-center text-2xl group-hover:from-blue-500/25 group-hover:to-purple-600/25 transition-colors">
                    {option.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {option.name}
                      </h3>
                      <p className="text-base text-slate-700 mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="inline-flex items-baseline gap-2">
                        <span
                          className="text-2xl font-extrabold bg-clip-text text-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(102deg, #6E3EF4 0%, #409AFF 60%)",
                          }}
                        >
                          €{option.betaPrice.toLocaleString()}
                        </span>
                        <span className="rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                          Beta
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 line-through">
                        €{option.standardPrice.toLocaleString()}
                      </div>
                      {option.cancelValue !== undefined && (
                        <div className="text-[10px] text-gray-500 mt-1">
                          Cancel fee: €{option.cancelValue.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  {option.features && (
                    <ul className="text-sm text-slate-700 space-y-2 mt-4">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 text-[11px]">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Includes */}
                  {option.includes && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {option.includes.map((system, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg text-xs font-medium"
                          >
                            {system}
                          </span>
                        ))}
                      </div>
                      {option.savings && (
                        <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {option.savings}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Note */}
                  {option.note && (
                    <div className="mt-4 text-xs text-amber-700 bg-amber-500/10 border border-amber-500/40 rounded-lg p-2">
                      ⚠️ {option.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="flex gap-5">
        <button
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all hover:shadow-md"
          onClick={prevStep}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          disabled
        >
          Auto-advancing…
        </button>
      </div>
    </div>
  );

  const StoreType = () => {
    const needsStoreInfo =
      trinitySelectionId === "trinity-plus" || trinitySelectionId === "garo";

    useEffect(() => {
      if (!needsStoreInfo) {
        nextStep();
      }
    }, [needsStoreInfo]);

    // When store info is needed, auto-advance once user selects an option
    useEffect(() => {
      if (needsStoreInfo && hasPhysicalStore !== null) {
        nextStep();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needsStoreInfo, hasPhysicalStore, nextStep]);

    if (!needsStoreInfo) {
      return null;
    }

    const trinitySelection = ALL_TRINITY_OPTIONS.find(
      (opt) => opt.id === trinitySelectionId
    );
    const basePrice = trinitySelection ? trinitySelection.betaPrice : 0;

    return (
      <div className="animate-fadeIn">
        <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 text-purple-600 rounded-full text-sm font-semibold mb-4 border border-purple-500/30">
          Business Type
        </div>
        <h2 className="text-3xl font-bold mb-2 text-slate-900">
          Do you have a physical storefront?
        </h2>
        <p className="text-slate-600 mb-8">
          This affects GARO system setup requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
              hasPhysicalStore === false
                ? "border-blue-500 bg-white"
                : "border-gray-200 hover:border-blue-200 hover:bg-white hover:-translate-y-1"
            }`}
            onClick={() => setHasPhysicalStore(false)}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-xl flex items-center justify-center mb-4">
              <Wifi className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              E-commerce Only
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Online business without a physical location.
            </p>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              €{basePrice.toLocaleString()}
            </div>
            <p className="text-emerald-600 text-sm mt-2">Standard API setup</p>
          </div>

          <div
            className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
              hasPhysicalStore === true
                ? "border-blue-500 bg-white"
                : "border-gray-200 hover:border-blue-200 hover:bg-white hover:-translate-y-1"
            }`}
            onClick={() => setHasPhysicalStore(true)}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-xl flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Physical Storefront
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Brick-and-mortar with inventory.
            </p>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              €{(basePrice + 1600).toLocaleString()}
            </div>
            <p className="text-amber-600 text-sm mt-2">
              +€1,600 Square setup & training
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="px-8 py-3 border-2 border-blue-200 text-slate-800 rounded-full font-semibold flex items-center gap-2 hover:bg-white transition-all"
            onClick={prevStep}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextStep}
            disabled={hasPhysicalStore === null}
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const IndustryStep = () => (
    <div className="animate-fadeIn">
      <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 text-purple-600 rounded-full text-sm font-semibold mb-4 border border-purple-500/30">
        Industry
      </div>
      <h2 className="text-3xl font-bold mb-2 text-slate-900">
        What industry are you in?
      </h2>
      <p className="text-slate-600 mb-8">
        This helps us tailor recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {industries.map((industry) => (
          <div
            key={industry.id}
            className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
              selectedIndustry === industry.id
                ? "border-blue-500 bg-white"
                : "border-gray-200 hover:border-blue-200 hover:bg-white hover:-translate-y-1"
            }`}
            onClick={() => setSelectedIndustry(industry.id as IndustryId)}
          >
            <div className="text-4xl mb-4">{industry.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              {industry.name}
            </h3>
            <p className="text-slate-600 text-sm">{industry.examples}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          className="px-8 py-3 border-2 border-blue-200 text-slate-800 rounded-full font-semibold flex items-center gap-2 hover:bg-white transition-all"
          onClick={prevStep}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={nextStep}
          disabled={!selectedIndustry}
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const GoalsStep = () => {
    const toggleGoal = (id: GoalId) => {
      setSelectedGoals((prevGoals) =>
        prevGoals.includes(id)
          ? prevGoals.filter((g) => g !== id)
          : [...prevGoals, id]
      );
    };
    return (
      <div className="animate-fadeIn">
        <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 text-purple-600 rounded-full text-sm font-semibold mb-4 border border-purple-500/30">
          Goals
        </div>
        <h2 className="text-3xl font-bold mb-2 text-slate-900">
          What are your primary goals?
        </h2>
        <p className="text-slate-600 mb-8">Select all that apply.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                selectedGoals.includes(goal.id as GoalId)
                  ? "border-blue-500 bg-white"
                  : "border-gray-200 hover:border-blue-200 hover:bg-white hover:-translate-y-1"
              }`}
              onClick={() => toggleGoal(goal.id as GoalId)}
            >
              <div className="text-4xl mb-4">{goal.icon}</div>
              <h4 className="text-lg font-semibold mb-2 text-slate-900">
                {goal.name}
              </h4>
              <p className="text-slate-600 text-sm">{goal.description}</p>
              <p className="text-emerald-600 text-sm font-semibold mt-2">
                {goal.savings}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-900">
            What&apos;s your budget range?
          </h3>
          <input
            type="range"
            min="500"
            max="25000"
            step="100"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-4">
            <div
              className="text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(102deg, #6E3EF4 10.45%, #409AFF 64.21%)",
              }}
            >
              €{budget.toLocaleString()}
            </div>
            <p className="text-slate-600 text-sm mt-1">Investment Range</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="px-8 py-3 border-2 border-blue-200 text-slate-800 rounded-full font-semibold flex items-center gap-2 hover:bg-white transition-all"
            onClick={prevStep}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextStep}
            disabled={selectedGoals.length === 0}
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const PlatformTier = () => {
    return (
      <div className="animate-fadeIn">
        <div className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 text-purple-600 rounded-full text-sm font-semibold mb-4 border border-purple-500/30">
          Platform
        </div>
        <h2 className="text-3xl font-bold mb-2 text-slate-900">
          Choose Your Platform Tier
        </h2>
        <p className="text-slate-600 mb-6">
          Select the web platform features you need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {platformTiers.map((tier) => {
            const isRecommended = recommendations.tierRec === tier.id;
            return (
              <div
                key={tier.id}
                className={`relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                  selectedTier === tier.id
                    ? "border-blue-500 bg-white"
                    : "border-gray-200 hover:border-blue-200 hover:bg-white hover:-translate-y-1"
                }`}
                onClick={() => setSelectedTier(tier.id as PlatformTierId)}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-5 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-semibold uppercase">
                    Recommended for You
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-4 text-slate-900">
                  {tier.name}
                </h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  €{tier.minPrice} - €{tier.maxPrice}
                </p>
                <ul className="space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-slate-600"
                    >
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          <button
            className="px-8 py-3 border-2 border-white/20 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-white/5 transition-all"
            onClick={prevStep}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextStep}
            disabled={!selectedTier}
          >
            Review & Proceed <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Return on Investment (ROI) Calculator Component
  const ROICalculator = () => {
    const totalCost = calculateRunningTotal();
    const estimatedMonthlySavings = useMemo(() => {
      let savings = 0;
      if (selectedGoals.includes("fees")) savings += 1500;
      if (selectedGoals.includes("automation")) savings += 800;
      if (trinitySelectionId) savings += 500; // Base value for having any Trinity system
      if (trinitySelectionId === "trinity-plus") savings += 700; // Additional value for plus
      return savings;
    }, [selectedGoals, trinitySelectionId]);

    const breakEvenMonths =
      estimatedMonthlySavings > 0
        ? (totalCost / estimatedMonthlySavings).toFixed(1)
        : "N/A";

    if (estimatedMonthlySavings === 0) return null;

    return (
      <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <TrendingUp className="text-green-400" />
          Estimated Return on Investment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-green-400">
              €{estimatedMonthlySavings.toLocaleString()}
            </p>
            <p className="text-gray-400 text-sm">Estimated Monthly Savings</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">
              {breakEvenMonths}
            </p>
            <p className="text-gray-400 text-sm">Months to Break Even</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          *This is an illustrative estimate based on typical results for
          businesses with your selected goals.
        </p>
      </div>
    );
  };

  // Consolidated Final Summary Component
  const FinalSummary = () => {
    const trinitySelection = ALL_TRINITY_OPTIONS.find(
      (opt) => opt.id === trinitySelectionId
    );
    const tier = platformTiers.find((t) => t.id === selectedTier);
    const industry = industries.find((ind) => ind.id === selectedIndustry);
    const total = calculateRunningTotal();
    const isBundle = solutionType === "both" && trinitySelection && tier;
    const discountedTotal = isBundle ? Math.round(total * 0.9) : total;

    return (
      <div className="animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            Your Custom Solution Summary
          </h2>
          <p className="text-gray-600">
            Here is a complete overview of your selections. Ready to proceed?
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1: Selections */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
                Your Selections
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Start:</span>
                  <span className="text-gray-900 font-medium capitalize bg-gray-100 px-2 py-1 rounded">
                    {solutionType}
                  </span>
                </li>
                {industry && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Industry:</span>
                    <span className="text-gray-900 font-medium">
                      {industry.name}
                    </span>
                  </li>
                )}
                {trinitySelection && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Trinity System:</span>
                    <span className="text-gray-900 font-medium">
                      {trinitySelection.name}
                    </span>
                  </li>
                )}
                {tier && (
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Platform Tier:</span>
                    <span className="text-gray-900 font-medium">
                      {tier.name}
                    </span>
                  </li>
                )}
                <li className="flex justify-between items-center">
                  <span className="text-gray-600">Budget:</span>
                  <span className="text-gray-900 font-medium">
                    ~€{budget.toLocaleString()}
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 2: Cost Breakdown */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-gray-900 border-b border-gray-200 pb-2">
                Cost Breakdown
              </h4>
              <div className="space-y-2 text-sm">
                {trinitySelection && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">
                      {trinitySelection.name}
                    </span>
                    <span className="text-gray-900">
                      €{trinitySelection.betaPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {hasPhysicalStore &&
                  (trinitySelectionId === "trinity-plus" ||
                    trinitySelectionId === "garo") && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Storefront Setup</span>
                      <span className="text-gray-900">€1,600</span>
                    </div>
                  )}
                {tier && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">{tier.name} Platform</span>
                    <span className="text-gray-900">
                      €{((tier.minPrice + tier.maxPrice) / 2).toLocaleString()}
                    </span>
                  </div>
                )}
                {isBundle && (
                  <div className="flex justify-between py-2 border-b border-gray-200 text-green-600">
                    <span>Bundle Discount (10%)</span>
                    <span>-€{Math.round(total * 0.1).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 text-lg font-bold">
                  <span className="text-gray-900">Total Investment</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    €{discountedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ROICalculator />

        <div className="flex gap-4 mt-8">
          <button
            onClick={prevStep}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={() =>
              showToastMessage(
                "Your quote has been submitted! We'll be in touch."
              )
            }
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            Finalize & Get Quote →
          </button>
        </div>
      </div>
    );
  };

  const steps = getSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br text-gray-900 overflow-x-hidden bg-white">
      <div className="fixed inset-0   z-0" />
      {/* <div className="fixed inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-10 animate-pulse z-[1]" /> */}

      <div className="relative z-10  ">
        <Navbar />
        <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 ">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 ">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 ">
          <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="px-4 py-10 md:py-20 md:pb-14">
          <h1 className="relative z-10 mx-auto max-w-4xl  sm:text-5xl lg:text-6xl text-center text-2xl font-black md:text-4xl lg:text-6xl">
            {"Transform Your Business with Intelligent Solutions"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className={`mr-2 inline-block ${
                    word === "Intelligent" || word === "Solutions"
                      ? "bg-gradient-to-r from-blue-500 via-indigo-500 pb-6 to-purple-600 bg-clip-text text-transparent"
                      : "text-slate-700"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 "
          >
            Custom websites, AI-powered systems, or both - tailored to your
            needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            <button className="w-72 rounded-3xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40">
              🚀 Explore Trinity Systems
            </button>

            <div className="w-72 rounded-[2rem] p-[2px] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
              <button className="w-full rounded-[2rem] bg-white px-6 py-3 font-semibold">
                Book Consultation
              </button>
            </div>
          </motion.div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-4xl border border-blue-200/50">
          <div className="flex justify-center gap-2  flex-wrap relative py-6">
            {hasStarted &&
              steps.map((step, i) => {
                const stepNum = i + 1;
                const isActive = currentStep === stepNum;
                const isCompleted = currentStep > stepNum;

                return (
                  <div
                    key={i}
                    className={`flex items-center px-4 py-2 rounded-full text-sm transition-all duration-300 border ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent scale-105"
                        : isCompleted
                        ? "bg-gradient-to-r from-blue-200 to-cyan-200 text-gray-800 border-transparent"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 font-semibold transition-colors ${
                        isActive
                          ? "bg-white/40"
                          : isCompleted
                          ? "bg-transparent"
                          : "bg-gray-200"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                    </span>
                    <span>{step}</span>
                  </div>
                );
              })}
            {hasStarted && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="rounded-full p-[2px] bg-gradient-to-r from-blue-500/50 to-purple-600/50 shadow-[0_1px_12px_rgba(99,102,241,0.25)]">
                  <button
                    onClick={resetSelections}
                    className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-5 py-2 text-xs font-semibold text-neutral-800 transition-all hover:bg-white hover:shadow-lg active:scale-[0.98]"
                    title="Reset steps"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-white">
                      <RefreshCw size={12} />
                    </span>
                    Reset steps
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-6xl mx-auto animate-fadeIn flex flex-col md:flex-row items-center justify-between p-8 mb-10 bg-white/90 backdrop-blur rounded-2xl shadow-xl">
            {renderStepContent()}
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-slideIn border border-gray-800 z-50">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-white">{showToast}</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default App;

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md shadow-purple-500/20">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold tracking-tight md:text-2xl">
              Trinity Business Systems
            </h1>
            <span className="hidden rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 md:inline-block">
              BETA
            </span>
          </div>
          <p className="hidden text-xs text-neutral-500 md:block">
            AI-powered automation & intelligence
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="hidden rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 md:inline-block">
          Docs
        </button>
        <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-neutral-900">
          Login
        </button>
      </div>
    </nav>
  );
};
