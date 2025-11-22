import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type ButtonLoadingProps = {
  text?: string;
  loading?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonLoading = ({
  type = "button",
  text = "Submit",
  loading = false,
  className = "",
  onClick = () => {},
  ...props
}: ButtonLoadingProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={cn("", className)}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "please wait..." : text}
    </Button>
  );
};

export default ButtonLoading;
