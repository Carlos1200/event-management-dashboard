"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getEventFiltersFromSearchParams,
  hasAdvancedEventFilters,
} from "./event-filters";

export function useEventFiltersController() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters = useMemo(
    () => getEventFiltersFromSearchParams(searchParams),
    [searchParams],
  );

  const hasAdvancedFilters = hasAdvancedEventFilters(filters);
  const [showAdvancedManual, setShowAdvancedManual] = useState(false);
  const showAdvanced = hasAdvancedFilters || showAdvancedManual;

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  const applyQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const clearFilters = () => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }

    router.replace(pathname, { scroll: false });
    setShowAdvancedManual(false);
  };

  const onSearchChange = (value: string) => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      applyQuery({ q: value });
    }, 300);
  };

  return {
    filters,
    hasAdvancedFilters,
    showAdvanced,
    setShowAdvancedManual,
    applyQuery,
    clearFilters,
    onSearchChange,
  };
}
