"use client";

import { FormControl, FormField, FormItem } from "@/shared/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { BettingFormData } from "../betting-modal.schema";

interface ScoreInputProps {
  form: UseFormReturn<BettingFormData>;
  name: `palpites.${number}.casa` | `palpites.${number}.visitante`;
}

export function ScoreInput({ form, name }: ScoreInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <input
              {...field}
              value={field.value || ""}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-14 text-center text-3xl font-black italic bg-white border-2 border-black brutalist-shadow focus:outline-none focus:bg-yellow-400 focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
              onChange={(e) => {
                if (/^\d?$/.test(e.target.value)) {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
