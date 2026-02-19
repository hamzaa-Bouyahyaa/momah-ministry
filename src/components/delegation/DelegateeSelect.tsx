import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Delegatee } from "@/types/delegation";

interface DelegateeSelectProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  delegatees: Delegatee[];
}

function DelegateeSelect({
  value,
  onValueChange,
  delegatees,
}: DelegateeSelectProps) {
  const selected = delegatees.find((d) => d.id === value);

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium text-foreground">المفوّض له</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full flex-row-reverse">
          <SelectValue placeholder="اختر المفوّض له">
            {selected && (
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={selected.avatar} alt={selected.name} />
                  <AvatarFallback>{selected.name[0]}</AvatarFallback>
                </Avatar>
                <span>{selected.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-(--radix-select-trigger-width)"
        >
          {delegatees.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={d.avatar} alt={d.name} />
                  <AvatarFallback>{d.name[0]}</AvatarFallback>
                </Avatar>
                <span>{d.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { DelegateeSelect };
