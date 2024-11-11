import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import tabsData from "./tabs/TabsMapping";

// TabsDemo Component
export function TabsDemo() {
  const tabsListRef = useRef(null);
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("account");
  const [areButtonsHidden, setAreButtonsHidden] = useState(false);



  const handleScroll = (direction: "left" | "right") => {
    const container = tabsListRef.current;
    const scrollAmount = 200;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const updateButtonState = () => {
    const container = tabsListRef.current;
    const scrollbarWidth = container.offsetWidth - container.clientWidth;

    const isAtStart = container.scrollLeft <= 1;
    const isAtEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - scrollbarWidth - 1;

    setIsScrolledToStart(isAtStart);
    setIsScrolledToEnd(isAtEnd);
  };

  const updateButtonVisibility = () => {
    const container = tabsListRef.current;
    const totalTabsWidth = tabsData.length * 160 + (tabsData.length - 1) * 8;
    const screenWidth = window.innerWidth;

    setAreButtonsHidden(totalTabsWidth <= screenWidth);
  };

  useEffect(() => {
    const container = tabsListRef.current;
    container.addEventListener("scroll", updateButtonState);
    updateButtonState();
    updateButtonVisibility();

    window.addEventListener("resize", updateButtonVisibility);

    return () => {
      container.removeEventListener("scroll", updateButtonState);
      window.removeEventListener("resize", updateButtonVisibility);
    };
  }, []);

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab} // Update current tab when a tab is selected
      className="w-full"
    >
      <div className="relative flex items-center justify-between">
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll("left")}
          disabled={isScrolledToStart}
          className={`p-1 bg-gray-200 rounded-full ${
            isScrolledToStart ? "opacity-50 cursor-not-allowed" : ""
          } ${areButtonsHidden ? "hidden" : ""}`}
        >
          &#8592; {/* Left Arrow */}
        </button>

        {/* Tabs List */}
        <TabsList
          ref={tabsListRef}
          className="flex gap-2 overflow-x-scroll overflow-y-hidden scroll-smooth mx-2 justify-start py-2"
        >
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.value} className="shrink-0 w-[160px]" value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll("right")}
          disabled={isScrolledToEnd}
          className={`p-1 bg-gray-200 rounded-full ${
            isScrolledToEnd ? "opacity-50 cursor-not-allowed" : ""
          } ${areButtonsHidden ? "hidden" : ""}`}
        >
          &#8594; {/* Right Arrow */}
        </button>
      </div>

      {/* Render the selected tab content using `tabsData` */}
      <div className="tab__contents mt-2">
        {tabsData.find((tab) => tab.value === currentTab)?.child}
      </div>
    </Tabs>
  );
}
