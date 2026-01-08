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
              className="w-9 h-10 text-center text-lg font-bold bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
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
