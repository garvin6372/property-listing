"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
    isFilterVisible: boolean;
    toggleFilter: () => void;
    setFilterVisible: (visible: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilter = () => setIsFilterVisible((prev) => !prev);
    const setFilterVisible = (visible: boolean) => setIsFilterVisible(visible);

    return (
        <FilterContext.Provider value={{ isFilterVisible, toggleFilter, setFilterVisible }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
}
